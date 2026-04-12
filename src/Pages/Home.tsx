import { Inicio } from '../components/layout/Hero';
import { Header } from '../components/layout/Header';
import ContatoLocal from '../components/contact/ContactLocal';
import { DestaqueSemana } from '../components/menu/WeeklyHighlight';
import { Footer } from '@/components/layout/Footer';
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
