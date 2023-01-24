import { Link, routes } from '@redwoodjs/router'

import Users from 'src/components/user/Users'

export const QUERY = gql`
  query FindUsers {
    users {
      id
      name
      email
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ users }) => {
  return <Users users={users} />
}