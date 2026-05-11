import { dishes } from '../menu/Menu'
import { Separator } from '../ui/separator'

interface MenuProps {
  nome: string
  nameSection: string | null
  id: number
  valor: string
  imageSrc?: string
  desc?: string
}

interface MainProps {
  searchText: string
  addToBag: (dish: MenuProps) => void
  selectedDishes: MenuProps[]
}

export function Main({ searchText, addToBag }: MainProps) {
  let currentSection = ''

  const sections = dishes.reduce(
    (acc, dish) => {
      if (dish.nameSection) currentSection = dish.nameSection
      const section = currentSection
      if (!acc[section]) acc[section] = []
      acc[section].push(dish)
      return acc
    },
    {} as Record<string, typeof dishes>,
  )

  const filtered = Object.entries(sections).reduce(
    (acc, [section, items]) => {
      const filteredItems = items.filter(
        (dish) =>
          searchText.trim() === '' ||
          dish.nome.toLowerCase().includes(searchText.toLowerCase()),
      )
      if (filteredItems.length > 0) acc[section] = filteredItems
      return acc
    },
    {} as Record<string, typeof dishes>,
  )

  const sectionNames = Object.keys(filtered)

  return (
    <div className="min-h-screen bg-white mx-auto max-w-6xl px-4 pt-32 pb-16 sm:px-6 md:pt-40 lg:px-8 xl:pt-44">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {sectionNames.map((sectionName) => (
          <div
            key={sectionName}
            id={sectionName.replace(/\s+/g, '-').toLowerCase()}
            className="rounded-xl border border-zinc-200 p-4"
          >
            <h2 className="mb-3 text-lg font-bold text-orange-500">
              {sectionName}
            </h2>
            <Separator className="mb-4 bg-zinc-200" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filtered[sectionName].map((dish) => (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => addToBag(dish)}
                  className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 text-left duration-300 hover:bg-zinc-50"
                >
                  <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={dish.imageSrc}
                      alt={dish.nome}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold text-zinc-900 sm:text-sm">
                      {dish.nome}
                    </h3>
                    {dish.desc && (
                      <p className="text-xs text-zinc-500 leading-tight">{dish.desc}</p>
                    )}
                    <p className="text-xs text-zinc-400 mt-1">{dish.valor}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}