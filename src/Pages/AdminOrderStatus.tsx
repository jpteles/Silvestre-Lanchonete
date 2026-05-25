import { useState } from 'react';
import { Check, ListOrdered, Truck } from 'lucide-react';

const statusEtapas = [
  { label: 'Pedido em preparação', icon: Check },
  { label: 'Pedido em preparação', icon: ListOrdered },
  { label: 'Pedido em rota de entrega', icon: Truck },
];

const mockPedido = {
  numero: 11,
  status: 0,
  itens: [
    {
      quantidade: 1,
      nome: 'Pizza 25cm',
      descricao: 'Broto 25cm, MassaTradicional, Borda região, Catupiry da Casa, Batata Crunch, Pepperoni',
      valor: 28.00,
    }
  ]
};

export function AdminOrderStatus() {
  const [statusAtual, setStatusAtual] = useState(mockPedido.status);

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-md">

        {/* Timeline */}
        <div className="mb-6 rounded-2xl bg-zinc-800 p-6">
          <div className="flex flex-col gap-0">
            {statusEtapas.map((etapa, index) => {
              const Icon = etapa.icon;
              const ativo = index === statusAtual;
              const concluido = index < statusAtual;

              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      ativo || concluido
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-zinc-600 text-zinc-500'
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

        {/* Detalhes do pedido */}
        <div className="mb-6 rounded-2xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-bold text-orange-500">
            Pedido N° {mockPedido.numero}
          </h2>
          {mockPedido.itens.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <span className="font-bold text-white">{item.quantidade}x</span>
                  <div>
                    <p className="font-bold text-white">{item.nome}</p>
                    <p className="text-sm text-orange-400">{item.descricao}</p>
                  </div>
                </div>
                <p className="ml-4 font-bold text-white">R$ {item.valor.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botões admin */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
            Atualizar status
          </p>
          {statusEtapas.map((etapa, index) => (
            <button
              key={index}
              onClick={() => setStatusAtual(index)}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                statusAtual === index
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
              }`}
            >
              {index + 1}. {etapa.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminOrderStatus;