import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

export function Admin() {
  return (
    <section className="h-192 bg-[#EF6A11]">
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 rounded-xl"
          onClick={() => navigate('/produtos')}
        >
          Gerenciar Produtos
        </button>

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 rounded-xl"
          onClick={() => navigate('/pedidos')}
        >
          Visualizar Pedidos
        </button>
      </div>
    </div>
    </section>
  );
}