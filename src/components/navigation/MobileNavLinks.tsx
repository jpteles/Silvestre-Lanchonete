import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuth } from '../../contexts/AuthContext'

interface MobileNavLinksProps {
  showMenuButton: boolean
  isLogout: boolean
}

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ showMenuButton, isLogout }) => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      {showMenuButton && (
        <button
          onClick={() => navigate('/menu')}
          className="h-10 w-full rounded-md border border-white/10 bg-orange-500 font-bold text-white duration-500 ease-in-out hover:bg-orange-50 hover:transition"
        >
          Cardápio
        </button>
      )}

      {/* Botão admin — só aparece se o usuário for ADMIN */}
      {isLogout && user?.role === 'ADMIN' && (
        <button
          onClick={() => navigate('/admin')}
          className="h-10 w-full rounded-md border border-orange-500 font-bold text-orange-500 duration-500 ease-in-out hover:bg-orange-500 hover:text-white hover:transition"
        >
          Administração de produtos
        </button>
      )}

      {isLogout && (
        <Button
          onClick={() => logout()}
          className="flex w-full items-center px-3 font-bold hover:bg-gray-500"
        >
          Sair
        </Button>
      )}
    </>
  )
}

export default MobileNavLinks