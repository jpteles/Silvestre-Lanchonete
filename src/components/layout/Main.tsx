import React, { useMemo } from 'react';

// Tipagem baseada no que você me enviou
export interface MenuProps {
  nome: string;
  nameSection: string | null;
  id: number;
  valor: string;
  imageSrc: string;
  desc?: string;
}

interface MainProps {
  dishes?: MenuProps[]; // Tornamos opcional e com valor default abaixo para evitar quebra
  searchText?: string;
  addToBag?: (dish: any) => void;
  selectedDishes?: any[];
}

export function Main({ dishes = [], searchText = '', addToBag, selectedDishes }: MainProps) {
  
  // 1. Agrupando os pratos pelas categorias
  const groupedDishes = useMemo(() => {
    // Trava de segurança contra tela branca
    if (!Array.isArray(dishes) || dishes.length === 0) {
      return {};
    }

    let currentCategory = 'Outros';
    const groups: Record<string, MenuProps[]> = {};

    dishes.forEach((dish) => {
      // Atualiza a categoria sempre que encontrar um nameSection
      if (dish.nameSection) {
        currentCategory = dish.nameSection;
      }

      if (!groups[currentCategory]) {
        groups[currentCategory] = [];
      }

      // Filtro de busca
      const matchesSearch = dish.nome.toLowerCase().includes(searchText.toLowerCase()) || 
                            (dish.desc && dish.desc.toLowerCase().includes(searchText.toLowerCase()));

      if (matchesSearch) {
        groups[currentCategory].push(dish);
      }
    });

    // Remove categorias que ficaram vazias após a busca
    Object.keys(groups).forEach(key => {
      if (groups[key].length === 0) delete groups[key];
    });

    return groups;
  }, [dishes, searchText]);

  // Tela de loading ou vazio caso não tenha itens
  if (!dishes || dishes.length === 0) {
    return (
      <div className="pt-48 pb-20 flex justify-center items-center">
        <p className="text-zinc-500">Nenhum produto encontrado no cardápio.</p>
      </div>
    );
  }

  return (
    <main className="pt-48 pb-20 px-4 md:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto">
      
      {/* Container principal imitando a divisão em quadrantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-zinc-200 bg-zinc-50/30 rounded-md overflow-hidden">
        
        {Object.entries(groupedDishes).map(([category, items], index) => {
          // Lógica para as bordas ficarem parecidas com o print (linha dividindo no meio e embaixo)
          const isEven = index % 2 === 0;
          const isLastRow = index >= Object.keys(groupedDishes).length - 2;

          return (
            <div 
              key={category} 
              id={category.replace(/\s+/g, '-').toLowerCase()} // Para a navegação do SectionNav funcionar
              className={`p-6 border-zinc-200 
                ${isEven ? 'lg:border-r' : ''} 
                ${!isLastRow ? 'border-b' : 'border-b lg:border-b-0'}
              `}
            >
              {/* Título da Categoria */}
              <h2 className="text-orange-500 font-bold text-xl mb-6">
                {category}
              </h2>

              {/* Grid de produtos dentro da categoria */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {items.map((dish) => (
                  <div 
                    key={dish.id} 
                    onClick={() => addToBag && addToBag(dish)} // Clique para adicionar ao carrinho
                    className="flex bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md hover:border-orange-200 transition-all cursor-pointer h-32"
                  >
                    {/* Imagem */}
                    <div className="w-[120px] h-full flex-shrink-0 bg-gray-100">
                      <img 
                        src={dish.imageSrc} 
                        alt={dish.nome} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/120?text=Sem+Foto';
                        }}
                      />
                    </div>

                    {/* Conteúdo */}
                    <div className="p-3 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-[13px] font-bold text-gray-800 leading-tight mb-1">
                          {dish.nome}
                        </h3>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">
                          {dish.desc}
                        </p>
                      </div>
                      <span className="text-[11px] font-medium text-gray-500 mt-2 block">
                        {dish.valor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          );
        })}
        
      </div>
    </main>
  );
}