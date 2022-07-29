import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import differenceInYears from 'date-fns/differenceInYears'
import { format } from 'date-fns'

const GET_ALUNO_BY_SLUG_QUERY = gql`
  query GetAlunoBySlug($slug: String) {
    aluno(where: { slug: $slug }) {
      bornDate
      class
      name
      photo {
        url
      }
      responsible2
      responsible
      telResponsible2
      telResponsible
    }
  }
`

interface GetAlunoBySlugProps {
  aluno: {
    bornDate: number
    class: string
    name: string
    photo: {
      url: string
    }
    responsible2: string
    responsible: string
    telResponsible2: number
    telResponsible: number
  }
}

export function StudentInfo() {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useQuery<GetAlunoBySlugProps>(GET_ALUNO_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  })

  if (!data) {
    return <div className="flex ">Carregando</div>
  }

  // const age = new Date() - Number(data.aluno.bornDate)
  const dateTodayFormatted = format(new Date(), 'u MM dd').replaceAll(' ', ', ')
  const dateBornFormatted = data.aluno.bornDate.toString().replaceAll('-', ', ')
  const age = differenceInYears(
    new Date(dateTodayFormatted),
    new Date(dateBornFormatted),
  )

  const classFormatted = data.aluno.class.replace('class', '')

  const telDDD = data.aluno.telResponsible.toString().slice(0, 2)
  const telBeforeOfUnderscore = data.aluno.telResponsible.toString().slice(2, 7)
  const telAfterOfUnderscore = data.aluno.telResponsible.toString().slice(7)
  const telDDD2 = data.aluno.telResponsible2.toString().slice(0, 2)
  const telBeforeOfUnderscore2 = data.aluno.telResponsible2
    .toString()
    .slice(2, 7)
  const telAfterOfUnderscore2 = data.aluno.telResponsible2.toString().slice(7)

  return (
    <>
      <header className="bg-blue-500 text-white h-32 p-6 flex-col mb-6 flex items-center justify-center ">
        <span className="text-sm">Aluno:</span>
        <span className="text-3xl">{data.aluno.name}</span>
        <span>{age} anos</span>
      </header>
      <main className="flex flex-col items-center">
        <img
          src={data.aluno.photo.url}
          alt=""
          className="w-64 h-64 rounded-full"
        />
        <div className="mt-6 flex flex-col text-center bg-blue-200 p-5 rounded">
          <span className="font-bold text-2xl">Turma: {classFormatted}</span>
          <span>Data: 26/06/2019</span>
          <span>Entrada: 18h00</span>
          <span>Saída: 21h20</span>
        </div>
        <div className="mt-6 flex flex-col text-center border-blue-200 border-2 p-4 rounded">
          <span className="text-2xl mb-2 font-bold">Responsáveis</span>
          <span>
            {data.aluno.responsible} -{' '}
            <a
              href={`tel:${data.aluno.telResponsible}`}
            >{`(${telDDD}) ${telBeforeOfUnderscore}-${telAfterOfUnderscore}`}</a>
          </span>
          <span>
            {data.aluno.responsible2} -{' '}
            <a
              href={`tel:${data.aluno.telResponsible2}`}
            >{`(${telDDD2}) ${telBeforeOfUnderscore2}-${telAfterOfUnderscore2}`}</a>
          </span>
        </div>
        <div className="mt-8 flex flex-col">
          <a
            href="#"
            className="bg-blue-600 text-center text-gray-50 w-72 p-4 rounded-lg mb-3 hover:bg-blue-400"
          >
            Informações/Anúncios
          </a>
          <a
            href="#"
            className="bg-blue-600 text-center text-gray-50 w-72 p-4 rounded-lg mb-3 hover:bg-blue-400"
          >
            Ocorrências
          </a>
          <a
            href="#"
            className="bg-blue-600 text-center text-gray-50 w-72 py-4 rounded-lg mb-3 hover:bg-blue-400"
          >
            Boletim Online
          </a>
        </div>
      </main>
    </>
  )
}
