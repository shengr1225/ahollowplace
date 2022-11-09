import User from 'src/components/User/User'

export const QUERY = gql`
  query FindOneUserById($id: Int!) {
    user: user(id: $id) {
      id
      name
      email
      jubenDriveId
      thumbnail
      desc
      label
      tuili
      yanji
      xiezuo
      gaoxiao
      qinggan
      knot
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }) => {
  return <User user={user} />
}
