import { CircleUserRound } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../navigation/DropdownMenu'
import { useAuth } from '../../contexts/AuthContext' // <-- Usando o seu sistema
import { Button } from '../ui/button'
import MobileNavLinks from '../navigation/MobileNavLinks'
import { useNavigate } from 'react-router-dom'

const UsernameMenu = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // Redireciona para a home após sair
  }

  const handleLogin = () => {
    navigate('/login') // Manda para a sua tela de login
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 font-bold hover:text-orange-500">
        <CircleUserRound className="text-orange-500" />
        {user?.name || 'Visitante'}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? (
          <>
            <DropdownMenuItem>
              <MobileNavLinks showMenuButton={true} isLogout={false} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={handleLogout}
                className="flex flex-1 bg-red-500 font-bold text-white hover:bg-red-600"
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="space-y-5">
            <Button
              onClick={handleLogin}
              className="w-full bg-orange-500 font-bold text-white hover:bg-orange-600"
            >
              Log In
            </Button>
            <MobileNavLinks showMenuButton={true} isLogout={false} />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu