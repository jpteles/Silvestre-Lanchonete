// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import Login from './Pages/Login';
import Cadastro from './Pages/Register';
import { Header } from './components/menu/HeaderMenu'; // Componente que mostra o cardápio
import { Admin } from './Pages/Admin'; // <-- IMPORTE SUA PÁGINA ADMIN (ajuste o caminho se necessário)
import RedefinirSenha from './Pages/ResetPassword';
import Autenticacao from './Pages/Authentication';
import CriarSenha from './Pages/CreatePassword';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota para o cardápio/menu principal */}
        <Route path="/menu" element={<Header />} /> 
        
        {/* Nova Rota para Administração de Produtos */}
        <Route path="/admin" element={<Admin />} /> 

        <Route path="/forgot-password" element={<RedefinirSenha />} />
        <Route path="/verificar-codigo" element={<Autenticacao />} />
        <Route path="/criar-nova-senha" element={<CriarSenha />} />
      </Routes>
    </BrowserRouter>
  );
}