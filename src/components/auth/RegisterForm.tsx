import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButton from "./SocialLoginButton";
// import { authApi } from "../../services/api";
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      // Usamos a função register do AuthContext passando o DTO esperado
      await register({ name, email, password });
      
      // Se não der erro, o utilizador já está logado e com os tokens guardados
      navigate("/menu");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido no registro.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    setError(null);
    setIsGoogleLoading(true);
    
    // Redireciona diretamente para o endpoint de registro do Google no backend
    window.location.href = 'http://localhost:8080/auth/register/google'; 
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        {error && (
          <div className="mb-4 rounded border border-red-600 bg-red-900/50 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={isLoading || isGoogleLoading}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Endereço de e-mail"
            className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={isLoading || isGoogleLoading}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 pr-12 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              minLength={6}
              disabled={isLoading || isGoogleLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              disabled={isLoading || isGoogleLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full rounded bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {isLoading ? "Cadastrando..." : "Cadastre-se!"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-neutral-500">
          Já tem uma conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-black hover:underline"
            disabled={isGoogleLoading}
          >
            Entrar
          </button>
        </div>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-400">ou</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <SocialLoginButton provider="google" onClick={handleGoogleRegister} />

        {isGoogleLoading && (
          <p className="mt-2 text-center text-orange-400">
            Redirecionando para o Google...
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;