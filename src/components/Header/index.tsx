import { useContext } from 'react'
import { SearchContext } from '../../App'

export function Header() {
  const { search, setSearch } = useContext(SearchContext)

  return (
    <header className="bg-blue-500 text-white h-32 p-6 flex flex-col mb-6">
      <span className="text-xl">Olá atendente</span>
      <input
        type="text"
        placeholder="Pesquise um nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-3 p-2 text-gray-900"
      />
    </header>
  )
}
