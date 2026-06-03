import axios, { InternalAxiosRequestConfig } from "axios";

// Defina as portas de acordo com os serviços Java que você está rodando.
// (Ajuste as portas abaixo se a ordem estiver diferente no seu ambiente local)
const URL_AUTH = import.meta.env.VITE_AUTH_API || "http://localhost:8080";
const URL_PRODUCT = import.meta.env.VITE_PRODUCT_API || "http://localhost:8081";
const URL_ORDER = import.meta.env.VITE_ORDER_API || "http://localhost:8082";

// Interceptor reaproveitável para injetar o token JWT
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 1. Cliente para o Auth Service
export const authApi = axios.create({
  baseURL: URL_AUTH,
  headers: { "Content-Type": "application/json" },
});
authApi.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));

// 2. Cliente para o Product Service
export const productApi = axios.create({
  baseURL: URL_PRODUCT,
  headers: { "Content-Type": "application/json" },
});
productApi.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));

// 3. Cliente para o Order Service
export const orderApi = axios.create({
  baseURL: URL_ORDER,
  headers: { "Content-Type": "application/json" },
});
orderApi.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));