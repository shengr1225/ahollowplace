import { Label } from '@redwoodjs/forms'
export const QUERY = gql`
  query FindJubenById($id: Int!) {
    juben(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => (
  <Label name="jubenId" className="text-xl font-extrabold mr-1">
    Loading
  </Label>
)

export const Empty = () => {
  return (
    <Label
      name="jubenId"
      className="text-xl font-extrabold mr-1"
      errorClassName="rw-label rw-label-error"
    >
      juben not found
    </Label>
  )
}

export const Failure = ({ error }) => (
  <Label
    name="jubenId"
    className="text-xl font-extrabold mr-1"
    errorClassName="rw-label rw-label-error"
  >
    {error.message}
  </Label>
)

export const Success = ({ juben }) => {
  return (
    <Label
      name="jubenId"
      className="text-xl font-extrabold mr-1"
      errorClassName="rw-label rw-label-error"
    >
      {juben.name}
    </Label>
  )
}
