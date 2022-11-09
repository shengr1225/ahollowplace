export const QUERY = gql`
  query FindJubenQuery($id: Int!) {
    juben: juben(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ juben }) => {
  return <div>{JSON.stringify(juben)}</div>
}
