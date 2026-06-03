import { Inicio } from '../components/layout/Hero';
import { Header } from '../components/layout/Header';
import ContatoLocal from '../components/contact/ContactLocal';
import { DestaqueSemana } from '../components/menu/WeeklyHighlight';
import { Footer } from '@/components/layout/Footer';
import AdminPage from './AdminProduct';

export function Home() {
  return (
    <section>
      <Header />
      <Inicio />
      <DestaqueSemana />
      <ContatoLocal />
      <Footer />
      <AdminPage />
    </section>
  );
}
