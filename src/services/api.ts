import axios, { InternalAxiosRequestConfig } from "axios";

const URL_AUTH = import.meta.env.VITE_AUTH_API || "http://localhost:8080";
const URL_PRODUCT = import.meta.env.VITE_PRODUCT_API || "http://localhost:8081";
const URL_ORDER = import.meta.env.VITE_ORDER_API || "http://localhost:8082";

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  // Tenta as duas chaves possíveis
  const token = localStorage.getItem("authToken") || localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const authApi = axios.create({
  baseURL: URL_AUTH,
  headers: { "Content-Type": "application/json" },
});
authApi.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));

export const productApi = axios.create({
  baseURL: URL_PRODUCT,
  headers: { "Content-Type": "application/json" },
});
productApi.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));

export const orderApi = axios.create({
  baseURL: URL_ORDER,
  headers: { "Content-Type": "application/json" },
});
orderApi.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));

// ================================
// AUTH — porta 8080
// ================================

export const authAPI = {
  login: (email: string, password: string) =>
    authApi.post('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    authApi.post('/auth/register', { name, email, password }),

  updateToken: (refreshToken: string) =>
    authApi.post('/auth/update-token', { refreshToken }),

  forgotPassword: (email: string) =>
    authApi.post('/auth/forgot-password', { email }),

  validateCode: (token: string) =>
    authApi.post('/auth/validate-code', { token }),

  resetPassword: (token: string, newPassword: string) =>
    authApi.post('/auth/reset-password', { token, newPassword }),

  googleLogin: () => {
    window.location.href = `${URL_AUTH}/auth/login/google`
  },

  googleRegister: () => {
    window.location.href = `${URL_AUTH}/auth/register/google`
  },

  googleAuthorized: (code: string) =>
    authApi.get('/auth/login/google/authorized', { params: { code } }),
}

// ================================
// PRODUCTS — porta 8081
// ================================

export const productAPI = {
  getAll: (params?: {
    category?: string
    available?: boolean
    name?: string
    minPrice?: number
    maxPrice?: number
    page?: number
    size?: number
    sortBy?: string
    direction?: 'asc' | 'desc'
  }) => productApi.get('/products', { params }),

  getById: (id: string) =>
    productApi.get(`/products/${id}`),

  create: (formData: FormData) =>
    productApi.post('/products', formData),

  update: (id: string, formData: FormData) =>
    productApi.put(`/products/${id}`, formData),

  delete: (id: string) =>
    productApi.delete(`/products/${id}`),
}

// ================================
// ORDERS — porta 8082
// ================================

export const orderAPI = {
  create: (orderRequest: object) =>
    orderApi.post('/orders', orderRequest),

  getAll: (params?: { status?: string; page?: number; size?: number }) =>
    orderApi.get('/orders', { params }),

  updateStatus: (id: string, newStatus: string) =>
    orderApi.put(`/orders/status/${id}`, null, { params: { newStatus } }),
}

export default authApi;