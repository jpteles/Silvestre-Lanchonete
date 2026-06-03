import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { authApi } from '../../services/api';

const CreatePasswordForm: React.FC = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const tokenRedefinicao = location.state?.tokenRedefinicao;

  useEffect(() => {
    if (!tokenRedefinicao) {
      navigate('/forgot-password', { replace: true });
    }
  }, [tokenRedefinicao, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    try {
      // Usamos o post apontando para a rota de reset do backend.
      // O corpo do JSON mapeia exatamente os atributos definidos no PasswordResetTokenDTO do Java.
      await authApi.post('/auth/reset-password', { 
        token: tokenRedefinicao, 
        newPassword: senha 
      });
      
      setMensagem('Senha redefinida com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
        navigate('/login', {
          state: { mensagemSucesso: 'Sua senha foi alterada com sucesso. Faça login com sua nova senha.' }
        });
      }, 2500);
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Falha ao redefinir a senha. O token pode ser inválido ou ter expirado.');
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Nova senha */}
        <div className="relative space-y-1">
          <label htmlFor="nova-senha" className="mb-1 block text-sm text-gray-400">
            Nova Senha
          </label>
          <input
            id="nova-senha"
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => { setSenha(e.target.value); setErro(''); }}
            placeholder="Digite sua nova senha"
            className="w-full rounded-md border border-gray-700 bg-transparent px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={carregando}
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-[calc(50%+12px)] -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirmar senha */}
        <div className="relative space-y-1">
          <label htmlFor="confirmar-nova-senha" className="mb-1 block text-sm text-gray-400">
            Confirmar Nova Senha
          </label>
          <input
            id="confirmar-nova-senha"
            type={mostrarConfirmarSenha ? 'text' : 'password'}
            value={confirmarSenha}
            onChange={(e) => { setConfirmarSenha(e.target.value); setErro(''); }}
            placeholder="Confirme sua nova senha"
            className="w-full rounded-md border border-gray-700 bg-transparent px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={carregando}
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-[calc(50%+12px)] -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
          >
            {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-md bg-orange-600 py-3 font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {carregando ? 'Salvando...' : 'Confirmar Alterações'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-orange-500 transition hover:text-orange-400 hover:underline"
        >
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
};

export default CreatePasswordForm;