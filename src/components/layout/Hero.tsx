export function Inicio() {
  const p2Text = "Na Silvestre Lanchonete e Hamburgueria, acreditamos que uma refeição vai além do sabor: é uma experiência! Localizados na Vila Santa Catarina, em São Paulo, nossa missão é proporcionar momentos deliciosos em um ambiente acolhedor, onde cada cliente se sente em casa. Estamos prontos para te atender com muito carinho e dedicação.";

  return (
    <div className="w-full bg-[#F0F0F0] text-black py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <h1 className="font-poppins text-center font-bold text-4xl md:text-5xl text-[#0A1A2F] mb-12 md:mb-20">
          Com a Alma Brasileira
        </h1>
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 lg:flex-col">
          <div className="w-full md:w-1/4 shrink-0">
            <h2 className="font-poppins text-[#EF6A11] text-3xl font-bold mb-4 md:mb-0">
              Quem Somos
            </h2>
          </div>
          <div className="w-full md:w-3/4 space-y-6">
            <p className="font-poppins text-base md:text-lg text-gray-800 leading-relaxed">
              Se você busca uma experiência gastronômica única, nosso restaurante é o lugar ideal! Localizado na charmosa Zona Sul, oferecemos um ambiente aconchegante e um cardápio irresistível, repleto de pratos preparados com ingredientes frescos e selecionados.
            </p>
            <p className="font-poppins text-base md:text-lg text-gray-800 leading-relaxed">
              {p2Text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}