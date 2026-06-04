import React, { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import ContactLocal from '../components/contact/ContactLocal';
import { Footer } from '@/components/layout/Footer';
import { productApi } from '../services/api';

const URL_PRODUCT = import.meta.env.VITE_PRODUCT_API || "http://localhost:8081";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl?: string;
}

export function Lanches() {
  const [lanches, setLanches] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarLanches();
  }, []);

  const carregarLanches = async () => {
    try {
      // 1. Vai buscar os produtos ao Backend (Java)
      const response = await productApi.get('/products');
      const todosProdutos = response.data.content ?? response.data;
      
      // 2. Filtra APENAS os Hambúrgueres e Beirutes
      const apenasLanches = todosProdutos.filter(
        (p: Produto) => p.category === 'HAMBURGUERES_BEIRUTES'
      );
      
      setLanches(apenasLanches);
    } catch (error) {
      console.error("Erro ao carregar lanches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Título */}
        <h1 className="mb-1 text-2xl font-bold text-orange-500 sm:text-3xl">
          Nossos deliciosos lanches
        </h1>
        <h2 className="mb-8 text-sm font-bold text-orange-500">
          Hambúrgueres & Beirutes
        </h2>

        {/* Grid de cards conectado ao Java */}
        {loading ? (
          <div className="flex items-center justify-center py-12 text-zinc-400">
            A carregar o nosso cardápio...
          </div>
        ) : lanches.length === 0 ? (
          <div className="py-12 text-zinc-500">Nenhum lanche encontrado.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {lanches.map((lanche) => (
              <div
                key={lanche.id}
                className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                {/* Verifica se a imagem existe no banco, senão mostra um placeholder */}
                {lanche.imageUrl ? (
                  <img
                    src={lanche.imageUrl.startsWith('http') ? lanche.imageUrl : `${URL_PRODUCT}${lanche.imageUrl}`}
                    alt={lanche.name}
                    className="h-28 w-28 flex-shrink-0 rounded-lg object-cover sm:h-32 sm:w-32"
                  />
                ) : (
                  <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 sm:h-32 sm:w-32">
                    <span className="text-xs text-zinc-400">Sem foto</span>
                  </div>
                )}
                
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-zinc-900">{lanche.name}</h3>
                  <p className="text-sm leading-snug text-zinc-500">{lanche.description}</p>
                  <p className="mt-2 text-sm font-semibold text-zinc-400">
                    A partir de: R$ {typeof lanche.price === 'number' ? lanche.price.toFixed(2).replace('.', ',') : lanche.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-[#F0F0F0] py-4 font-poppins">
        <ContactLocal />
      </div>
      <Footer />
    </div>
  );
}