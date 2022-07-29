import { createContext, useState } from 'react'
import { Header } from './components/Header'
import { StudentsList } from './components/StudentsList'

interface SearchContextProps {
  search: string
  setSearch: (e: string) => void
}

export const SearchContext = createContext({} as SearchContextProps)
function App() {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <Header />
      <StudentsList />
    </SearchContext.Provider>
  )
}

export default App
