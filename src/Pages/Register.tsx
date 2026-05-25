import Logo from '/assets/Logo.png'
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-6 animate-fadeIn">
           <Link to="/">
          <img className="h-16 lg:h-20" src={Logo} alt="Logo" />
          </Link>
        </div>
        
        <div className="w-full bg-[#F0F0F0] rounded-lg p-1 flex flex-col items-center animate-slideUp">
          <h1 className="text-2xl font-bold text-black mb-2">Cadastre-se</h1>
          <p className="text-gray-900">
            Pronto para fazer seus pedidos de forma rápida e prática?
          </p>
          <p className="text-gray-900">Preencha os dados abaixo e comece agora mesmo!</p>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default App;