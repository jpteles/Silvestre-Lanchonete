import { Fragment } from 'react';
import { NavLink } from './NavLink';

interface MenuItem {
  nome: string;
  nameSection: string | null;
  id: number;
  valor: string;
  imageSrc?: string;
}

interface SectionNavProps {
  dishes: MenuItem[];
  onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function SectionNav({ dishes, onNavLinkClick }: SectionNavProps) {
  const sections = dishes
    .filter((dish) => dish.nameSection !== null)
    .reduce((acc, dish) => {
      if (!acc.find((item) => item.nameSection === dish.nameSection)) {
        acc.push(dish);
      }
      return acc;
    }, [] as MenuItem[]);

  return (
    <div className="flex items-center overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100 lg:justify-center">
      <nav className="flex items-center space-x-3 px-2 md:gap-5 xl:gap-6 2xl:gap-8">
        {sections.map((dish) => (
          <Fragment key={dish.id || dish.nameSection}>
            {dish.nameSection && (
              <NavLink
                href={`#${dish.nameSection.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={onNavLinkClick}
                className="flex-shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white focus:outline-none md:text-sm 2xl:text-base"
              >
                {dish.nameSection}
              </NavLink>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}