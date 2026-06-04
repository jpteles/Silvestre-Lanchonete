import { useState, useEffect } from 'react';
import { Check, ListOrdered, Truck, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '@/components/layout/Header';

// Interfaces para o TypeScript
interface ItemPedido {
  quantidade: number;
  nome: string;
  descricao: string;
  valor: number;
}

interface PedidoData {
  numero: number;
  status: number;
  itens: ItemPedido[];
}

interface OrderStatusProps {
  orderId?: number;
}

const statusEtapas = [
  { label: 'Pedido recebido', icon: Check },
  { label: 'Pedido em preparação', icon: ListOrdered },
  { label: 'Pedido em rota de entrega', icon: Truck },
];

export function OrderStatus({ orderId = 11 }: OrderStatusProps) {
  const { user } = useAuth(); // Pegando o usuário logado do seu contexto
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'Administrador'; // Verificando se é admin

  const [pedido, setPedido] = useState<PedidoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect usando MOCK (dados falsos) para simular o backend
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        setLoading(true);
        // Simulando um tempo de carregamento de API (1 segundo)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dados simulados do pedido
        const mockData: PedidoData = {
          numero: orderId || 11,
          status: 0, // 0: Recebido, 1: Em preparação, 2: Em rota
          itens: [
            {
              quantidade: 1,
              nome: 'Virado à Paulista - Segunda-feira',
              descricao: 'Acompanha arroz soltinho, feijão, couve, farofa, ovos e suculenta linguiça grelhada.',
              valor: 24.90
            }
          ]
        };

        setPedido(mockData);
      } catch (err: unknown) {
        setError('Erro ao carregar o mock do pedido.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [orderId]);

  // Função MOCK para o ADMIN atualizar o status visualmente
  const handleAtualizarStatus = async (novoStatus: number) => {
    try {
      // Simulando o tempo da API para atualizar (meio segundo)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Atualiza o visual da tela instantaneamente após o "sucesso"
      setPedido(prev => prev ? { ...prev, status: novoStatus } : null);

    } catch (err) {
      alert('Não foi possível atualizar o status do pedido.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-orange-500">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !pedido) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4 text-white">
        <div className="rounded-xl bg-red-500/10 p-4 text-red-500 border border-red-500">
          <p>{error || 'Pedido não encontrado.'}</p>
        </div>
      </div>
    );
  }

  return (
   
    <div className="min-h-screen bg-white px-4  text-white">
       <Header />
      <div className="mx-auto max-w-md mt-5">

        {/* --- PAINEL DE CONTROLE EXCLUSIVO PARA ADMIN --- */}
        {isAdmin && (
          <div className="mb-6 rounded-2xl border border-dashed border-orange-500 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-bold text-orange-500">Controle Administrativo</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleAtualizarStatus(0)}
                disabled={pedido.status === 0}
                className="flex-1 rounded-md bg-zinc-700 py-2 text-xs font-bold transition hover:bg-zinc-600 disabled:opacity-50"
              >
                Recebido
              </button>
              <button
                onClick={() => handleAtualizarStatus(1)}
                disabled={pedido.status === 1}
                className="flex-1 rounded-md bg-orange-600 py-2 text-xs font-bold transition hover:bg-orange-500 disabled:opacity-50"
              >
                Em Preparo
              </button>
              <button
                onClick={() => handleAtualizarStatus(2)}
                disabled={pedido.status === 2}
                className="flex-1 rounded-md bg-green-600 py-2 text-xs font-bold transition hover:bg-green-500 disabled:opacity-50"
              >
                Em Rota
              </button>
            </div>
          </div>
        )}
        {/* ----------------------------------------------- */}

        {/* Timeline Visual (Iguais para todos) */}
        <div className="mb-6 rounded-2xl bg-zinc-800 p-6">
          <div className="flex flex-col gap-0">
            {statusEtapas.map((etapa, index) => {
              const Icon = etapa.icon;
              const ativo = index === pedido.status;
              const concluido = index < pedido.status;

              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      ativo || concluido ? 'border-orange-500 bg-orange-500 text-white' : 'border-zinc-600 text-zinc-500'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {index < statusEtapas.length - 1 && (
                      <div className={`mt-1 h-8 w-0.5 ${concluido ? 'bg-orange-500' : 'bg-zinc-600'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`font-bold ${ativo || concluido ? 'text-orange-500' : 'text-white'}`}>
                      {etapa.label}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {concluido ? 'Concluído' : ativo ? 'Em andamento' : 'Pendente'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalhes do pedido (Iguais para todos) */}
        <div className="rounded-2xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-bold text-orange-500">
            Pedido N° {pedido.numero}
          </h2>
          {pedido.itens.map((item, index) => (
            <div key={index} className="mb-2 flex items-start justify-between">
              <div className="flex gap-3">
                <span className="font-bold text-white">{item.quantidade}x</span>
                <div>
                  <p className="font-bold text-white">{item.nome}</p>
                  <p className="text-sm text-orange-400">{item.descricao}</p>
                </div>
              </div>
              <p className="ml-4 font-bold text-white">R$ {item.valor.toFixed(2)}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default OrderStatus;