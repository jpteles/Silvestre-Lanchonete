import Feijoada from '/assets/feijoada.jpg'
import Virado from '/assets/Virado_a_Paulista_1.jpg'
import BifeRole from "/assets/bife_a_role.jpg"
import Macarrao from "/assets/macarronada-coxa-sobrecoxa-frango 1.jpg"
import Peixe from "/assets/file_de_peixe.jpg"
import Parmegiana from "/assets/parmegiana.jpg"
import { Leaf, Clock, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const pratos = [
  {
    img: Feijoada,
    title: "Feijoada",
    desc: "Acompanha arroz soltinho, feijoada, couve, farofa, torresmo e bisteca.",
    preco: "R$ 24,80"
  },
  {
    img: Virado,
    title: "Virado à Paulista",
    desc: "Acompanha arroz soltinho, feijão, couve, farofa, ovos e suculenta linguiça grelhada.",
    preco: "R$ 24,80"
  },
  {
    img: BifeRole,
    title: "Bife à Rolê",
    desc: "Acompanha arroz soltinho, feijão e bife à rolê.",
    preco: "R$ 24,80"
  },
  {
    img: Macarrao,
    title: "Macarrão com Frango",
    desc: "Acompanha Macarrão ao molho e frango cozido.",
    preco: "R$ 24,80"
  },
  {
    img: Peixe,
    title: "Filé de Peixe",
    desc: "Acompanha arroz, feijão, filé de peixe empanado, batata frita e purê.",
    preco: "R$ 24,80"
  },
  {
    img: Parmegiana,
    title: "Parmegiana",
    desc: "Acompanha arroz, a parmegiana de carne ou frango e batata frita.",
    preco: "R$ 24,80"
  }
]

export function DestaqueSemana() {
  return (
    <section className="w-full bg-white py-12 font-poppins">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Título */}
        <h2 className="text-2xl font-bold text-zinc-900">Nosso menu</h2>
        <p className="mb-8 text-2xl font-bold text-orange-500">Especialidades do chef</p>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pratos.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-1 text-center font-bold text-orange-500">{item.title}</h3>
                <p className="mb-4 text-sm text-zinc-600">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded border border-zinc-300 px-3 py-1 text-sm text-zinc-700">
                    {item.preco}
                  </span>
                   <Link to="/menu">
                  <button className="rounded border border-zinc-300 px-4 py-1 text-sm font-medium text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                    Comprar
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé com ícones */}
        <div className="mt-10 flex flex-col items-center justify-around gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-zinc-700">
            <Leaf className="h-6 w-6" />
            <span className="text-sm font-medium">Ingredientes frescos</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700">
            <Clock className="h-6 w-6" />
            <span className="text-sm font-medium">Preparo rápido</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700">
            <Heart className="h-6 w-6" />
            <span className="text-sm font-medium">Feito com amor</span>
          </div>
        </div>

      </div>
    </section>
  )
}