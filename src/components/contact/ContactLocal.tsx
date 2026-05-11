import fachada from '/assets/fachada.png'

function ContatoLocal() {
  return (
    <section className="w-full bg-[#F0F0F0] py-16 font-poppins">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="lg:w-2/3">
            <p className="font-poppins text-base md:text-lg text-gray-800 leading-relaxed">
              Há anos fazendo parte da história da nossa comunidade, nosso restaurante nasceu com o propósito de reunir pessoas em torno de uma boa mesa. Somos uma família que acredita no valor das receitas tradicionais, no cuidado com cada detalhe e no atendimento acolhedor que faz você se sentir em casa.
            </p>
          </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-4 lg:w-2/4 mt-16">
            <h2 className="font-cursive text-3xl italic text-orange-500 leading-tight">
              Venha nos visitar!
            </h2>
            <div className="space-y-3 text-zinc-800">
              <p className="w-2/3 mt-5">
                R. Rishin Marsuda, 508 – Vila Santa Catarina, São Paulo – SP, 04371-000
              </p>
              <p className="text-base">(11) 97746-8366</p>
              <p className="text-base">Seg à Dom (08hrs às 20hrs)</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-5/12">
            <img
              src={fachada}
              alt="Fachada Silvestre Lanchonete"
              className="w-full rounded-2xl object-cover shadow-md"
            />
            <iframe
              title="Localização Silvestre Lanchonete"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.766356433943!2d-46.6587291!3d-23.648536999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5bc79c46996b%3A0x3d9bcb8e22665dc2!2sSilvestre%20Lanchonete%20e%20Hambugueria!5e0!3m2!1spt-BR!2sbr!4v1713741921956!5m2!1spt-BR!2sbr"
              width="100%"
              height="260"
              className="rounded-2xl shadow-md"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContatoLocal