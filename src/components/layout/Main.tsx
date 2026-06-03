import { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import { productApi } from '../../services/api'

interface Produto {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
  imageUrl?: string
}

interface MainProps {
  searchText: string
  addToBag: (dish: any) => void
  selectedDishes: any[]
}

export function Main({ searchText, addToBag }: MainProps) {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        setLoading(true)
        const response = await productApi.get('/products', {
          params: { available: true, size: 50 }
        })
        setProdutos(response.data.content ?? response.data)
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
        setErro('Não foi possível carregar o cardápio.')
      } finally {
        setLoading(false)
      }
    }

    buscarProdutos()
  }, [])

  // Filtra pelo searchText
  const produtosFiltrados = produtos.filter(
    (p) =>
      searchText.trim() === '' ||
      p.name.toLowerCase().includes(searchText.toLowerCase())
  )

  // Agrupa por categoria
  const secoes = produtosFiltrados.reduce(
    (acc, produto) => {
      const cat = produto.category ?? 'Outros'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(produto)
      return acc
    },
    {} as Record<string, Produto[]>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-zinc-400">Carregando cardápio...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-red-400">{erro}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white mx-auto max-w-5xl px-4 pt-32 pb-16 sm:px-6 md:pt-40 lg:px-8 xl:pt-44">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {Object.entries(secoes).map(([categoria, itens]) => (
          <div
            key={categoria}
            id={categoria.replace(/\s+/g, '-').toLowerCase()}
            className="rounded-xl border border-zinc-200 p-4"
          >
            <h2 className="mb-3 text-lg font-bold text-orange-500">{categoria}</h2>
            <Separator className="mb-4 bg-zinc-200" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {itens.map((produto) => (
                <button
                  key={produto.id}
                  type="button"
                  onClick={() => addToBag({
                    id: produto.id,
                    nome: produto.name,
                    valor: `R$ ${produto.price.toFixed(2)}`,
                    imageSrc: produto.imageUrl,
                    desc: produto.description,
                  })}
                  className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 text-left duration-300 hover:bg-zinc-50"
                >
                  {produto.imageUrl ? (
                    <img
                      src={produto.imageUrl}
                      alt={produto.name}
                      className="h-16 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-20 flex-shrink-0 rounded-lg bg-zinc-100" />
                  )}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold text-zinc-900 sm:text-sm">
                      {produto.name}
                    </h3>
                    {produto.description && (
                      <p className="text-xs leading-tight text-zinc-500">
                        {produto.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-zinc-400">
                      A partir de: R$ {produto.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}