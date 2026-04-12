import { CircleUserRound, Menu, LogOut } from 'lucide-react';
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

interface MenuSheetProps {
  isAuthenticated: boolean;
  userName: string | null;
  onLogout: () => void;
}

export function MenuSheet({ isAuthenticated, userName, onLogout }: MenuSheetProps) {
  const navigate = useNavigate();

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
                <div className="space-y-4">
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