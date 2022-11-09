import Juben from 'src/components/Juben/Juben'

export const QUERY = gql`
  query FindJubenById($id: Int!) {
    juben: juben(id: $id) {
      id
      name
      score
      image
      desc
      section
      sections
      players
      canSwitchSex
      duration
      price
      mvps {
        id
      }
      photos
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Juben not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ juben }) => {
  return <Juben juben={juben} />
}
