import { useState } from 'react';
import { ShoppingBag, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitOrder, OrderRequest } from '../services/api'

export function CheckoutCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Simulando os itens que estariam no estado do carrinho do usuário
  const cartItems = [
    { productId: '123e4567-e89b-12d3-a456-426614174000', amount: 2 },
    { productId: '987fcdeb-51a2-43d7-9012-345678901234', amount: 1 },
  ];

  const handleFinishOrder = async () => {
    setIsLoading(true);
    setStatus('idle');

    try {
      // Montando o objeto exatamente como o OrderRequestDTO do Java espera
      const payload: OrderRequest = {
        items: cartItems.map(item => ({
          productId: item.productId,
          amount: item.amount,
        })),
      };

      await submitOrder(payload);
      setStatus('success');
      
      // Aqui você poderia limpar o carrinho global do seu app
      
    } catch (error) {
      setStatus('error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-orange-500" />
        Finalizar Pedido
      </h2>

      <div className="text-gray-600 mb-6">
        <p>Você tem {cartItems.length} itens no carrinho.</p>
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Pedido enviado com sucesso para a cozinha!</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>Ocorreu um erro ao enviar o pedido. Tente novamente.</span>
        </div>
      )}

      <button
        onClick={handleFinishOrder}
        disabled={isLoading || cartItems.length === 0}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors flex justify-center items-center gap-2
          ${isLoading 
            ? 'bg-orange-300 cursor-not-allowed' 
            : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
          }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          'Confirmar Pedido'
        )}
      </button>
    </div>
  );
}