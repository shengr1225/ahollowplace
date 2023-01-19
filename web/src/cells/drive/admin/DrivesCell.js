import { Link, routes } from '@redwoodjs/router'

import JubenDrives from 'src/components/drive/Drives'

export const QUERY = gql`
  query FindJubenDrives {
    jubenDrives {
      id
      date
      male
      female
      total
      status
      juben {
        name
      }
      timeSlotId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No jubenDrives yet. '}
      <Link to={routes.newJubenDrive()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ jubenDrives }) => {
  return <JubenDrives jubenDrives={jubenDrives} />
}
