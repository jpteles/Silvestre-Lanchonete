import { useState } from 'react';
import { toast } from 'sonner';

interface CartItem {
  nome: string;
  nameSection: string | null;
  id: number;
  valor: string;
  imageSrc?: string;
}

export function useCart(isAuthenticated: boolean, userName: string | null) {
  const [selectedDishes, setSelectedDishes] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const parsePrice = (valor: string) =>
    parseFloat(valor.replace(/A partir de: R\$ /g, '').replace(',', '.'));

  const addToBag = (dish: CartItem) => {
    if (!isAuthenticated) {
      toast.error('Faca login para adicionar itens a sacola.');
      return false;
    }
    setSelectedDishes((prev) => [...prev, dish]);
    setTotalPrice((prev) => prev + parsePrice(dish.valor));
    toast.success(`${dish.nome} adicionado a sacola!`);
    return true;
  };

  const removeFromBag = (dish: CartItem) => {
    setSelectedDishes((prev) => prev.filter((d) => d.id !== dish.id));
    setTotalPrice((prev) => prev - parsePrice(dish.valor));
    toast.error(`${dish.nome} removido da sacola.`);
  };

  const clearCart = () => {
    setSelectedDishes([]);
    setTotalPrice(0);
  };

  const formatOrder = () => {
    let mensagem = `Ola, Silvestre Lanchonete! Gostaria de fazer o seguinte pedido feito por ${userName || 'um cliente'}:\n\n`;
    selectedDishes.forEach((dish) => {
      mensagem += `- ${dish.nome} (${dish.valor})\n`;
    });
    mensagem += `\nTotal: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    return mensagem;
  };

  return { selectedDishes, totalPrice, addToBag, removeFromBag, clearCart, formatOrder };
}