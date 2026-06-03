import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SocialLoginButton from './SocialLoginButton';
import { useAuth } from '../../contexts/AuthContext'; // Integração com o Contexto
// import { authApi } from '../../services/api'; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  // Extraindo a função de login e o estado de carregamento do contexto
  const { login, isLoading, authenticateWithGoogle } = useAuth(); 
  
  const navigate = useNavigate();
  const location = useLocation();

  // Login tradicional
  const handleTraditionalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // O contexto já lida com a chamada da API, localStorage e Headers do axios
      await login({ email, password });
      navigate('/menu');
    } catch (err: any) {
      setError(err.message || 'Email ou senha inválidos. Verifique suas credenciais.');
    }
  };

  // Login Google (Redirecionamento)
  const handleGoogleLogin = () => {
    setError('');
    setIsGoogleLoading(true);
    
    // Redireciona o navegador diretamente para o endpoint do seu backend Java
    // que iniciará o fluxo do OAuth2.
    // Dica: Se quiser usar a variável de ambiente, pode ser algo como:
    // window.location.href = `${import.meta.env.VITE_AUTH_API}/auth/login/google`;
    window.location.href = 'http://localhost:8080/auth/login/google'; 
  };

  // Processa o code retornado pelo Google
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const errorParam = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

    if (location.pathname.endsWith('/login') && code && !errorParam) {
      if (!isGoogleLoading) {
        validateAuthCode(code);
      }
      setTimeout(() => {
        window.history.replaceState({}, document.title, location.pathname);
      }, 100);
    } else if (errorParam) {
      setError(decodeURIComponent(errorDescription || 'Falha na autenticação com Google.'));
      setIsGoogleLoading(false);
      window.history.replaceState({}, document.title, location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  // Valida o code do Google
  const validateAuthCode = async (code: string) => {
    setIsGoogleLoading(true);
    try {
      // Usaremos uma nova função do contexto para manter o estado global atualizado
      await authenticateWithGoogle(code);
      navigate('/menu');
    } catch (error: any) {
      setError(error.message || 'Falha na autenticação com Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isFormLoading = isLoading || isGoogleLoading;

  return (
    <div className="w-full bg-[#F0F0F0]">
      <form onSubmit={handleTraditionalLogin} className="flex flex-col gap-4">
        {error && (
          <p className="rounded border border-red-600 bg-red-900/50 p-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}
        {isFormLoading && (
          <div className="py-2 text-center text-orange-400">
            <p>Processando login...</p>
          </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="usuario@exemplo.com"
          className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
          disabled={isFormLoading}
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Senha"
            className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 pr-12 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={isFormLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isFormLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="mb-4 mt-2 w-full text-center text-sm">
          <Link to="/forgot-password" className="font-medium text-zinc-800 hover:text-zinc-400">
            Esqueceu a senha?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-orange-600 py-3 font-medium text-white transition hover:bg-orange-700 disabled:opacity-70"
          disabled={isFormLoading}
        >
          {isFormLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="h-px flex-grow bg-gray-300" />
        <span className="px-4 text-sm text-gray-500">ou</span>
        <div className="h-px flex-grow bg-gray-300" />
      </div>

      <SocialLoginButton provider="google" onClick={handleGoogleLogin} />
    </div>
  );
};

export default LoginForm;