import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContent";
// Importar 'type' para tipos
import type { RegisterRequestDTO } from "../contexts/AuthContent"; // Usando a interface definida e exportada no AuthContext
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading } = useAuth();
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userData: RegisterRequestDTO = { name, email, password }; //
      await register(userData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro desconhecido no registro."
      );
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome completo"
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full p-2 border rounded"
          required
          minLength={6}
        />
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Cadastrando..." : "Cadastre-se"}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigate('/login')} 
          className="text-blue-500 hover:underline"
        >
          Já tem conta? Faça login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;