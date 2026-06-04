import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { authApi } from "../services/api";
import axios from "axios";

export interface LoginRequestDTO {
  email: string;
  password?: string;
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  name: string;
  token: string;
  refreshToken: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; role?: string } | null;
  token: string | null;
  login: (credentials: LoginRequestDTO) => Promise<void>;
  register: (userData: RegisterRequestDTO) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  authenticateWithGoogle: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");
    if (storedToken && storedName) {
      setToken(storedToken);
      setUser({ name: storedName, role: storedRole ?? undefined });
      setIsAuthenticated(true);
      authApi.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  // Centralizador de salvamento de token
  const handleAuthResponse = (data: AuthResponse) => {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userName", data.name);
    if (data.role) localStorage.setItem("userRole", data.role);
    
    setToken(data.token);
    setUser({ name: data.name, role: data.role });
    setIsAuthenticated(true);
    authApi.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const login = async (credentials: LoginRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await authApi.post<AuthResponse>("/auth/login", credentials);
      handleAuthResponse(response.data);
    } catch (error: any) {
      logout();
      // Captura mensagem específica do seu back-end
      throw new Error(error.response?.data?.message || "Falha no login.");
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithGoogle = async (code: string) => {
    setIsLoading(true);
    try {
      // CORREÇÃO: Alinhamos a resposta com o que o back-end está enviando
      const response = await authApi.get(`/auth/login/google/authorized?code=${code}`);
      const { acessToken, refreshToken } = response.data; // Back-end envia 'acessToken'

      if (acessToken) {
        handleAuthResponse({
          name: "Usuário", // Se o back-end não mandar o nome, defina um fallback
          token: acessToken, // Mapeado corretamente para a estrutura esperada
          refreshToken: refreshToken,
        });
      } else {
        throw new Error("Token não recebido.");
      }
    } catch (error: any) {
      logout();
      // Agora o erro que você via antes ("Usuário não encontrado") vai subir para o seu formulário!
      throw new Error(error.response?.data?.message || "Falha ao autenticar com Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await authApi.post<AuthResponse>("/auth/register", userData);
      handleAuthResponse(response.data);
    } catch (error: any) {
      logout();
      throw new Error(error.response?.data?.message || "Erro ao registrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear(); // Limpeza total simplificada
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete authApi.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, register, logout, isLoading, authenticateWithGoogle }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};