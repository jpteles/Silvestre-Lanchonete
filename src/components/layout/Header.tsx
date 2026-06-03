import { Link } from 'react-router-dom'
import MobileNav from '../navigation/MobileNav'

export function Header() {
  return (
    <div className="w-full border-b border-[#724A2C] bg-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
        <Link to="/">
          <img src="/assets/icon.svg" alt="Silvestre Lanchonete" className="h-16 w-16" />
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/menu" className="font-semibold text-orange-500 hover:text-orange-600">
            Cardápio
          </Link>
        </nav>
          <div className="mr-28">
            <MobileNav />
          </div>
      </div>
    </div>
  )
}