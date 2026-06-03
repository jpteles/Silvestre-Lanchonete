import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authApi } from '../../services/api';

const VerificationForm: React.FC = () => {
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(''));
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
      return;
    }
    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value) || carregando) return;
    const novoCodigo = [...codigo];
    novoCodigo[index] = value.slice(-1);
    setCodigo(novoCodigo);
    setErro('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (carregando) return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const novoCodigo = [...codigo];
      if (novoCodigo[index]) {
        novoCodigo[index] = '';
        setCodigo(novoCodigo);
      } else if (index > 0) {
        novoCodigo[index - 1] = '';
        setCodigo(novoCodigo);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (carregando) return;
    e.preventDefault();
    const dadosColados = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    if (dadosColados.length > 0) {
      const novoCodigo = Array(6).fill('');
      for (let i = 0; i < dadosColados.length && i < 6; i++) {
        novoCodigo[i] = dadosColados[i];
      }
      setCodigo(novoCodigo);
      if (dadosColados.length === 6) inputRefs.current[5]?.focus();
      else inputRefs.current[dadosColados.length]?.focus();
    }
    setErro('');
  };

  const handleVerificacao = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);
    const codigoVerificacao = codigo.join('');

    if (codigoVerificacao.length !== 6) {
      setErro('Por favor, insira um código de 6 dígitos.');
      setCarregando(false);
      return;
    }

    try {
      // Substituído authApi.validateCode() pelo método post do Axios
      // A chave "token" corresponde exatamente ao esperado pelo CodeValidationRequestDTO
      await authApi.post('/auth/validate-code', { token: codigoVerificacao });
      
      setMensagem('Código verificado com sucesso!');
      setTimeout(() => {
        navigate('/criar-nova-senha', { state: { tokenRedefinicao: codigoVerificacao, email } });
      }, 1500);
    } catch (err: any) {
      setCodigo(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      setErro(err.response?.data?.message || 'Código de verificação inválido ou expirado.');
    } finally {
      setCarregando(false);
    }
  };

  const handleReenviarCodigo = async () => {
    setErro('');
    setMensagem('');
    setReenviando(true);
    try {
      // Alterado de .forgotPassword(email) para .post()
      // Certifique-se de que a rota no seu backend Java é exatamente essa (ex: '/auth/forgot-password' ou '/auth/password-reset')
      await authApi.post('/auth/forgot-password', { email });
      
      setMensagem('Um novo código de verificação foi enviado para o seu e-mail.');
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Falha ao reenviar o código. Tente novamente.');
    } finally {
      setReenviando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-2 text-center text-2xl font-bold text-black">Verificar Código</h2>
      <p className="mb-6 text-center text-sm text-gray-800">
        Digite o código de 6 dígitos enviado para{' '}
        <strong className="text-orange-400">{email || 'seu e-mail'}</strong>.
      </p>

      {mensagem && (
        <p className="mb-4 rounded bg-green-900/50 p-3 text-center text-sm text-green-900">
          {mensagem}
        </p>
      )}
      {erro && (
        <p className="mb-4 rounded border border-red-600 bg-red-900/50 p-3 text-center text-sm text-red-400">
          {erro}
        </p>
      )}

      <form onSubmit={handleVerificacao} className="flex flex-col gap-6">
        <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
          {codigo.map((digito, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digito}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="h-14 w-12 rounded-md border-2 border-gray-700 bg-transparent text-center text-xl font-semibold text-black transition-colors focus:border-orange-500 focus:outline-none disabled:opacity-50 sm:h-16 sm:w-14 sm:text-2xl"
              required
              disabled={carregando}
              aria-label={`Dígito ${index + 1} do código de verificação`}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={carregando || codigo.join('').length !== 6}
          className="w-full rounded-md bg-orange-600 py-3 font-medium text-black transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {carregando ? 'Verificando...' : 'Verificar'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-800">
          Não recebeu o código?{' '}
          <button
            onClick={handleReenviarCodigo}
            disabled={reenviando || carregando}
            className="font-medium text-orange-500 transition hover:text-orange-400 hover:underline disabled:cursor-not-allowed disabled:opacity-70"
          >
            {reenviando ? 'Reenviando...' : 'Reenviar'}
          </button>
        </p>
        <p className="mt-4 text-sm">
          <Link
            to="/forgot-password"
            className="text-gray-800 transition hover:text-gray-600 hover:underline"
          >
            Voltar para inserir e-mail
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerificationForm;