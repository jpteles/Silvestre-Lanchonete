import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../hooks/useCart';
import { CartDialog } from './CartDialog';
import { MenuSheet } from './MenuSheet';
import { SectionNav } from '../navigation/SectionNav';
import { Main } from '../layout/Main';
import { dishes } from './Menu';

export function Header() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { selectedDishes, totalPrice, addToBag, removeFromBag, clearCart, formatOrder } = useCart(
    isAuthenticated,
    user?.name ?? null
  );

  const handleLogout = () => {
    logout();
    clearCart();
    toast.info('Voce foi desconectado.');
    navigate('/');
  };

  const handleNavigateHome = () => navigate('/');

  function handleNavLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) scrollToSection(targetId.slice(1));
  }

  function scrollToSection(sectionId: string) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 140;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="header fixed z-10 flex w-full flex-col gap-3 border-b border-white/10 bg-zinc-900 px-4 md:px-8 lg:px-12 xl:px-16">
        
        <div className="mt-4 flex items-center justify-between gap-3 md:mt-6">
          <button
            onClick={handleNavigateHome}
            className="text-lg font-bold text-zinc-50 transition duration-300 hover:text-orange-500 md:text-xl xl:text-2xl 2xl:text-3xl"
          >
            Silvestre Lanchonete
          </button>

          <div className="hidden md:flex flex-grow items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 lg:mx-8 xl:mx-16 2xl:mx-24 max-w-xs md:max-w-sm lg:max-w-md">
            <Search className="size-4 text-orange-500 xl:size-5" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0 md:text-base"
              placeholder="Buscar no cardapio..."
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {isAuthenticated && (
              <CartDialog
                selectedDishes={selectedDishes}
                totalPrice={totalPrice}
                onRemove={removeFromBag}
                formatOrder={formatOrder}
              />
            )}
            <MenuSheet
              isAuthenticated={isAuthenticated}
              userName={user?.name ?? null}
              onLogout={handleLogout}
            />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 mx-auto w-full max-w-xs my-2">
          <Search className="size-4 text-orange-500" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
            placeholder="Buscar no cardapio..."
          />
        </div>

        <SectionNav dishes={dishes} onNavLinkClick={handleNavLinkClick} />
      </div>

      <Main
        searchText={searchText}
        addToBag={addToBag}
        selectedDishes={selectedDishes}
      />
    </div>
  );
}