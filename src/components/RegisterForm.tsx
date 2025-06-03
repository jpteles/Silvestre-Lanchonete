import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContent";
import type { RegisterRequestDTO } from "../contexts/AuthContent";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Ícones para mostrar/ocultar senha

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userData: RegisterRequestDTO = { name, email, password };
      await register(userData);
      navigate("/login"); // Redireciona para login após cadastro
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro desconhecido no registro."
      );
    }
  };

  return (
    <div className=" text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Endereço de e-mail"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-neutral-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:opacity-90 transition"
          >
            {isLoading ? "Cadastrando..." : "Cadastre-se!"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-neutral-400">
          Já tem uma conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-white font-semibold hover:underline"
          >
            Entrar
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-neutral-700" />
          <span className="mx-3 text-neutral-500 text-sm">ou</span>
          <hr className="flex-grow border-neutral-700" />
        </div>

        <button className="w-full flex items-center justify-center p-3 border border-neutral-700 rounded hover:bg-neutral-800 transition">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm text-white">Entrar com Google</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
