import React, { useState, useEffect, useCallback } from 'react'; // Adicionado useCallback
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SocialLoginButton from './SocialLoginButton'; // Certifique-se que o caminho está correto

const API_BASE_URL = 'https://api-docker-141213034707.us-central1.run.app';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTraditionalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      // Assumindo que AuthContext.login faria algo similar ou que este é um login "local"
      // que também precisa popular o localStorage para AuthContext e header_cardapio.
      const { name, token, refreshToken } = response.data;
      
      if (token) {
          localStorage.setItem('authToken', token); // Para AuthContext
          localStorage.setItem('token', token);     // Para compatibilidade com header_cardapio.tsx (se necessário)
      }
      if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
      }
      if (name) {
          localStorage.setItem('userName', name); // Para AuthContext
          localStorage.setItem('name', name);       // Para compatibilidade com header_cardapio.tsx (se necessário)
      }
      
      console.log('Usuário autenticado com email/senha:', name);
      // É importante que AuthContext também seja notificado para atualizar seu estado interno,
      // ou que ele leia do localStorage na próxima renderização.
      // Se AuthContext tiver uma função para setar o usuário após login manual, chame-a aqui.
      navigate('/menu');
    } catch (err: any) {
      console.error('Erro ao fazer login tradicional:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.name || err.response.data?.message || 'Email ou senha inválidos.');
      } else {
        setError('Email ou senha inválidos. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError('');
    setIsLoading(true);
    // Redireciona para o endpoint do backend para INICIAR o LOGIN com Google
    // Adicionando 'state=login' para possível diferenciação no callback, se necessário.
    window.location.href = `${API_BASE_URL}/auth/login/google?state=login`;
  };

  const validateAuthCode = useCallback(async (code: string, flowState?: string | null) => {
    console.log('FRONTEND: Validando código do Google:', code, 'com estado:', flowState);
    //setIsLoading(true); // Já é definido no useEffect antes de chamar esta função

    // Lógica para determinar o endpoint de validação com base no flowState, se necessário:
    let validationEndpoint = '/auth/login/google/authorized'; // Default para login
    if (flowState === 'register') {
      // Se o seu backend EXIGE um endpoint diferente para finalizar o registro com Google:
      // validationEndpoint = '/auth/register/google/authorized';
      // Caso contrário, se /auth/login/google/authorized lida com criação de usuário, mantenha-o.
      console.log('Fluxo identificado como registro, mas usando endpoint de login/authorized por padrão.');
      // Se você realmente tem /auth/register/google/authorized e precisa usá-lo:
      // validationEndpoint = '/auth/register/google/authorized';
    }

    try {
      const validationUrl = new URL(`${API_BASE_URL}${validationEndpoint}`);
      validationUrl.searchParams.append('code', code);

      console.log('FRONTEND: URL de validação:', validationUrl.toString());

      const response = await fetch(validationUrl.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      console.log('FRONTEND: Resposta do fetch recebida, status:', response.status);
      const responseBodyText = await response.text();
      console.log('FRONTEND: Corpo da resposta (texto):', responseBodyText);

      let data;
      try {
        data = JSON.parse(responseBodyText);
      } catch (parseError) {
        console.error('FRONTEND: Erro ao parsear JSON da resposta:', parseError, "\nCorpo da resposta:", responseBodyText);
        throw new Error('Resposta inválida do servidor de autenticação.');
      }

      if (!response.ok) {
        console.error('FRONTEND: Erro da API ao validar código do Google. Dados da resposta:', data);
        throw new Error(data.message || data.name || `Falha na autenticação com Google (status: ${response.status}).`);
      }
      
      console.log('FRONTEND: Dados recebidos do backend (Google Flow):', data);
      // CORREÇÃO: Usar chaves consistentes com AuthContext e nome de campo 'token' (se for o caso)
      // Assumindo que 'data' do backend tem: { name: string, token: string, refreshToken: string }
      if (data.token) { // Verifique se o backend retorna 'token' ou 'accessToken'
        localStorage.setItem('authToken', data.token);    // Para AuthContext
        localStorage.setItem('token', data.token);        // Para header_cardapio.tsx (se ainda usar)
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.name) {
        localStorage.setItem('userName', data.name);  // Para AuthContext
        localStorage.setItem('name', data.name);      // Para header_cardapio.tsx (se ainda usar)
      }
      
      // Idealmente, o AuthContext seria atualizado aqui chamando uma função do contexto.
      // Ex: auth.processLoginResponse(data); 
      // Isso forçaria um re-render dos componentes dependentes do estado de autenticação.
      // Sem isso, pode ser necessário um refresh da página ou navegação para o AuthContext recarregar do localStorage.

      console.log('FRONTEND: Usuário autenticado com Google. Redirecionando para /menu...');
      navigate('/menu');
    } catch (error: any) {
      console.error('FRONTEND: Erro dentro de validateAuthCode:', error);
      setError(error.message || 'Falha crítica na autenticação com Google.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]); // Adicionado navigate e API_BASE_URL (se fosse dinâmico)

  useEffect(() => {
    console.log('LoginForm useEffect disparado. Pathname:', location.pathname, 'Search:', location.search);
    
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state'); // Captura o parâmetro state
    const errorParam = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

    if (location.pathname.endsWith('/login') && code && !errorParam) {
      console.log('Código do Google detectado:', code, 'Estado:', state);
      if (!isLoading) { // Usa o isLoading local do LoginForm
        setIsLoading(true);
        validateAuthCode(code, state); // Passa o 'state' para validateAuthCode
      }
      setTimeout(() => {
        window.history.replaceState({}, document.title, location.pathname);
        console.log('Parâmetros da URL limpos.');
      }, 100);
    } else if (errorParam) {
      console.error('Erro retornado pelo Google na URL:', errorParam, errorDescription);
      setError(decodeURIComponent(errorDescription || 'Falha na autenticação com Google.'));
      setIsLoading(false);
      window.history.replaceState({}, document.title, location.pathname);
    } else if (code && !location.pathname.endsWith('/login')) {
        console.warn(`Código do Google detectado (${code}), mas o pathname atual (${location.pathname}) não é /login.`);
    }
  // Adicionadas dependências isLoading e validateAuthCode
  }, [location.pathname, location.search, isLoading, validateAuthCode]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleTraditionalLogin} className="flex flex-col gap-4">
        {error && (
          <p className="text-red-400 bg-red-900/50 p-3 rounded text-center text-sm border border-red-600">
            {error}
          </p>
        )}
        {isLoading && (
          <div className="text-center py-2 text-orange-400">
            <p>Processando login...</p>
          </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="usuario@exemplo.com"
          className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
          disabled={isLoading}
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Senha"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="mt-2 mb-4 text-sm w-full text-center"> 
          <Link 
            to="/forgot-password" 
            className="font-medium text-zinc-400 hover:text-zinc-300"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="px-4 text-sm text-gray-500">ou</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>
      <SocialLoginButton 
        provider="google" 
        onClick={handleGoogleLogin}
        // Se desejar desabilitar o botão SocialLoginButton visualmente,
        // você precisaria adicionar a prop `disabled` e lógica de estilo nele.
        // Ex: disabled={isLoading} 
      />
    </div>
  );
};

export default LoginForm;