import { Inicio } from '../components/Hero';
import { Header } from '../components/Header';
import ContatoLocal from '../components/ContactLocal';
import { DestaqueSemana } from '../components/WeeklyHighlight';
import { Footer } from '@/components/Footer';
// import AdminProduto from './AdminProduto'

export function Home() {
  return (
    <section className="Home bg-[#EF6A11]">
      <Header />
      <Inicio />
      <DestaqueSemana />
      <ContatoLocal />
      <Footer />
      {/* <AdminProduto /> */}
    </section>
  );
}
