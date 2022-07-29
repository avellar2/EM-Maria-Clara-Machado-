import { gql, useQuery } from '@apollo/client'
import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../App'

const GET_ALUNOS_QUERY = gql`
  query MyQuery {
    alunos {
      name
      slug
    }
  }
`

interface GetAlunosProps {
  name: string
  slug: string
}

export function StudentsList() {
  const { data } = useQuery<{ alunos: GetAlunosProps[] }>(GET_ALUNOS_QUERY)

  const { search } = useContext(SearchContext)

  const alunosFiltrados = useMemo(() => {
    const lowerSeach = search.toLowerCase()
    return data?.alunos.filter((aluno) =>
      aluno.name.toLowerCase().includes(lowerSeach),
    )
  }, [search, data?.alunos])

  return (
    <main className="flex flex-col justify-center items-center">
      {!search
        ? data?.alunos.map((aluno) => (
            <Link
              to={`/studentInfo/${aluno.slug}`}
              key={aluno.name}
              className="bg-blue-600 text-center text-gray-50 w-72 py-4 rounded-lg mb-3 hover:bg-blue-400"
            >
              {aluno.name}
            </Link>
          ))
        : alunosFiltrados?.map((aluno) => (
            <Link
              to={`/studentInfo/${aluno.slug}`}
              key={aluno.name}
              className="bg-blue-600 text-center text-gray-50 w-72 py-4 rounded-lg mb-3 hover:bg-blue-400"
            >
              {aluno.name}
            </Link>
          ))}
    </main>
  )
}
