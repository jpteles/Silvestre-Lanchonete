import { Header } from '../components/layout/Header'
import ContactLocal from '../components/contact/ContactLocal'
import { Footer } from '@/components/layout/Footer';

const lanches = [
  {
    id: 1,
    nome: 'X-Salada',
    desc: 'O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola e maionese.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/x_salada.png',
  },
  {
    id: 2,
    nome: 'X-Tudo',
    desc: 'O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola, bacon, ovo e maionese.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/x_tudo.png',
  },
  {
    id: 3,
    nome: 'X-Bacon',
    desc: 'O Sanduíche acompanha carne bovina, queijo cheddar, cebola e bacon.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/x-bacon.png',
  },
  {
    id: 4,
    nome: 'X-Frango',
    desc: 'O Sanduíche acompanha filé de frango, salada, tomate e cebola.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/x-frango.png',
  },
  {
    id: 5,
    nome: 'X-Churrasco',
    desc: 'O Sanduíche acompanha queijo, vinagrete e churrasco.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/x-churrasco.png',
  },
  {
    id: 6,
    nome: 'Americano',
    desc: 'O Sanduíche acompanha pão francês, presunto, queijo, alface, tomate e ovo.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/americano.png',
  },
  {
    id: 7,
    nome: 'Misto-Quente',
    desc: 'O Sanduíche acompanha pão francês, presunto e queijo.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/misto-quente.png',
  },
  {
    id: 8,
    nome: 'Queijo Quente',
    desc: 'O Sanduíche acompanha pão francês e queijo.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/queijo-quente.png',
  },
  {
    id: 9,
    nome: 'Beirute',
    desc: 'Acompanha alface, tomate, carne bovina ou filé de frango, maionese, queijo, cebola e batata frita.',
    valor: 'A partir de: R$ 00,00',
    imageSrc: '/assets/beirute.png',
  },
]

export function Lanches() {
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

        {/* Grid de cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {lanches.map((lanche) => (
            <div
              key={lanche.id}
              className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <img
                src={lanche.imageSrc}
                alt={lanche.nome}
                className="h-28 w-28 flex-shrink-0 rounded-lg object-cover sm:h-32 sm:w-32"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-zinc-900">{lanche.nome}</h3>
                <p className="text-sm text-zinc-500 leading-snug">{lanche.desc}</p>
                <p className="mt-2 text-sm text-zinc-400">{lanche.valor}</p>
              </div>
            </div>

          ))}
        </div>  
      </div>
      <div className="w-full bg-[#F0F0F0] py-4 font-poppins">
            <ContactLocal />
        </div>
          <Footer />
    </div>
  )
}