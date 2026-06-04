import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
// Importando os ícones para deixar igual ao MenuSheet
import { Utensils, ClipboardList, Settings, LogOut } from 'lucide-react'; 

interface MobileNavLinksProps {
  showMenuButton: boolean;
  isLogout: boolean;
}

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ showMenuButton, isLogout }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Verificação de Admin
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'Administrador';

  return (
    <div className="flex w-full flex-col gap-3"> {/* Container para alinhar e espaçar os botões perfeitamente */}
      
      {showMenuButton && (
        <Button
          onClick={() => navigate('/menu')}
          className="h-10 w-full gap-2 bg-orange-500 font-bold text-white transition-all duration-300 hover:bg-orange-600"
        >
          <Utensils className="size-4" />
          Cardápio
        </Button>
      )}

      {isLogout && (
        <Button
          onClick={() => navigate('/pedidos')}
          variant="outline"
          className="h-10 w-full gap-2 border-orange-500 font-bold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
        >
          <ClipboardList className="size-4" />
          {isAdmin ? 'Gerenciar Pedidos' : 'Meus Pedidos'}
        </Button>
      )}

      {isLogout && isAdmin && (
        <Button
          onClick={() => navigate('/admin')}
          variant="outline"
          className="h-10 w-full gap-2 border-orange-500 font-bold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
        >
          <Settings className="size-4" />
          Administração
        </Button>
      )}

      {isLogout && (
        <Button
          onClick={() => logout()}
          variant="ghost"
          className="h-10 w-full gap-2 font-bold text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="size-4" />
          Sair
        </Button>
      )}
      
    </div>
  );
}

export default MobileNavLinks;