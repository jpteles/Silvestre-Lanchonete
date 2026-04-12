import { ShoppingBag, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';

interface CartItem {
  nome: string;
  nameSection: string | null;
  id: number;
  valor: string;
  imageSrc?: string;
}

interface CartDialogProps {
  selectedDishes: CartItem[];
  totalPrice: number;
  onRemove: (dish: CartItem) => void;
  formatOrder: () => string;
}

export function CartDialog({ selectedDishes, totalPrice, onRemove, formatOrder }: CartDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative flex items-center rounded-md p-1.5 text-orange-500 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <ShoppingBag className="size-5 md:size-6" />
          {selectedDishes.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {selectedDishes.length}
            </span>
          )}
          <span className="sr-only">Abrir sacola</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg bg-zinc-950 shadow-lg">
        <div className="flex items-center justify-center gap-4 p-4 border-b border-zinc-800">
          <ShoppingBag className="size-6 text-zinc-300 md:size-7" />
          <p className="text-lg font-semibold text-zinc-100 md:text-xl">Sacola de Pedidos</p>
        </div>

        {selectedDishes.length === 0 ? (
          <p className="py-8 text-center text-zinc-400">Sua sacola esta vazia.</p>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {selectedDishes.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between gap-3 rounded-md bg-zinc-900 p-3">
                <div className="flex-grow">
                  <h3 className="font-semibold text-zinc-100 md:text-lg">{dish.nome}</h3>
                  <p className="text-sm text-zinc-400 md:text-base">{dish.valor}</p>
                </div>
                <button
                  type="button"
                  title={`Remover ${dish.nome}`}
                  onClick={() => onRemove(dish)}
                  className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                >
                  <Trash className="size-4 md:size-5" />
                  <span className="sr-only">Remover item</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedDishes.length > 0 && (
          <div className="space-y-3 border-t border-zinc-800 p-4">
            <div className="flex justify-between text-sm text-zinc-300">
              <p>Itens:</p>
              <p>{selectedDishes.length}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold text-zinc-100">
              <p>Total:</p>
              <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
            </div>
            <a
              href={`https://wa.me/5511977468366?text=${encodeURIComponent(formatOrder())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex h-11 w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 2xl:h-12"
            >
              Confirmar Pedido no WhatsApp
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}