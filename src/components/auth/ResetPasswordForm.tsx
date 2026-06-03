import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/api';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSolicitarRedefinicao = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);

    try {
      // Usamos o post apontando para a rota correta e enviando o email no corpo da requisição
      await authApi.post('/auth/forgot-password', { email });
      
      setMensagem('Se um e-mail correspondente for encontrado, um código de verificação será enviado.');
      setTimeout(() => {
        navigate('/verificar-codigo', { state: { email } });
      }, 3000);
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Falha ao solicitar redefinição de senha. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {mensagem && (
        <p className="mb-4 rounded bg-green-900/50 p-3 text-center text-sm text-green-400">
          {mensagem}
        </p>
      )}
      {erro && (
        <p className="mb-4 rounded border border-red-600 bg-red-900/50 p-3 text-center text-sm text-red-400">
          {erro}
        </p>
      )}

      <form onSubmit={handleSolicitarRedefinicao} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="email-reset" className="mb-1 block text-sm font-medium text-gray-800">
            Endereço de e-mail
          </label>
          <input
            id="email-reset"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErro(''); setMensagem(''); }}
            placeholder="seuemail@exemplo.com"
            className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={carregando}
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-md bg-orange-600 py-3 font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {carregando ? 'Enviando...' : 'Enviar Código de Redefinição'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-800">
          Lembrou sua senha?{' '}
          <Link to="/login" className="font-medium text-orange-500 transition hover:text-orange-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;