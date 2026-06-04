import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import Login from './Pages/Login';
import Cadastro from './Pages/Register';
import { Header } from './components/menu/HeaderMenu';
import Admin from './Pages/AdminProduct';
import RedefinirSenha from './Pages/ResetPassword';
import Autenticacao from './Pages/Authentication';
import CriarSenha from './Pages/CreatePassword';
import { Lanches } from './Pages/Snacks';
import OrderStatus from './Pages/OrderStatus';
import { CheckoutCart } from './components/CheckoutCart'; 

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/lanches" element={<Lanches />} />
        <Route path="/menu" element={<Header />} />
        <Route path="/forgot-password" element={<RedefinirSenha />} />
        <Route path="/verificar-codigo" element={<Autenticacao />} />
        <Route path="/criar-nova-senha" element={<CriarSenha />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pedidos" element={<OrderStatus />} />
        <Route path="/carrinho" element={<CheckoutCart />} />
      </Routes>
    </BrowserRouter>
  );
}