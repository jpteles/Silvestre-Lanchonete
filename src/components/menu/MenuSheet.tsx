import { CircleUserRound, Menu, LogOut, ClipboardList, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
// Importe o seu contexto de autenticação para pegarmos a Role do usuário
import { useAuth } from '../../contexts/AuthContext'; 

interface MenuSheetProps {
  isAuthenticated: boolean;
  userName: string | null;
  onLogout: () => void;
}

export function MenuSheet({ isAuthenticated, userName, onLogout }: MenuSheetProps) {
  const navigate = useNavigate();
  const { user } = useAuth(); // Pegando o usuário para checar o nível de acesso

  // Verificação de segurança: checa se é ADMIN
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'Administrador';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md p-1.5 text-orange-500 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-2">
          <Menu className="size-5 md:size-6" />
          <span className="sr-only">Abrir menu</span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-[calc(100%-2rem)] max-w-xs space-y-3 border-l border-white/10 bg-zinc-900 text-zinc-50 sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>
            {isAuthenticated ? (
              <div className="space-y-3 py-2">
                <span className="flex items-center gap-3 text-base font-bold text-zinc-50">
                  <CircleUserRound className="size-6 text-orange-500" />
                  {userName || 'Usuario'}
                </span>
                <Separator className="bg-zinc-800" />
              </div>
            ) : (
              <div className="space-y-3 py-2">
                <span className="text-base font-bold text-zinc-50">
                  Bem-vindo(a)!
                </span>
                <Separator className="bg-zinc-800" />
              </div>
            )}
          </SheetTitle>
          <SheetDescription asChild>
            <div className="flex flex-col gap-4 pt-2">
              {isAuthenticated ? (
                <div className="space-y-2"> {/* Reduzi o gap aqui para os botões ficarem mais juntos */}
                  
                  {/* --- NOVOS BOTÕES ADICIONADOS AQUI --- */}
                  
                  {/* Botão de Pedidos (Aparece para todos) */}
                  <Button
                    onClick={() => navigate('/pedidos')}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1.5 text-zinc-300 hover:bg-white/10 hover:text-white"
                  >
                    <ClipboardList className="size-4" />
                    {isAdmin ? 'Gerenciar Pedidos' : 'Meus Pedidos'}
                  </Button>

                  {/* Botão de Admin (Aparece SÓ para Admin) */}
                  {isAdmin && (
                    <Button
                      onClick={() => navigate('/admin')}
                      variant="ghost"
                      className="w-full justify-start gap-2 px-2 py-1.5 text-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
                    >
                      <Settings className="size-4" />
                      Administração de produtos
                    </Button>
                  )}
                  
                  {/* --------------------------------------- */}

                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1.5 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="size-4" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-400">
                    Faca login para ver seus pedidos e agilizar suas compras.
                  </p>
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-orange-600 font-semibold text-white hover:bg-orange-700"
                  >
                    Fazer Login ou Criar Conta
                  </Button>
                </div>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}