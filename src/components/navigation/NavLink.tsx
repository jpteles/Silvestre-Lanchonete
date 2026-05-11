import { ComponentProps } from 'react'

interface PropsNavLink extends ComponentProps<'a'> {
  children: string
}

export function NavLink(props: PropsNavLink) {
  return (
    <a
      {...props}
      className="text-[9.5px] font-medium text-zinc-700 transition duration-500 hover:text-orange-500 md:text-sm 2xl:text-lg"
    >
      {props.children}
    </a>
  )
}
