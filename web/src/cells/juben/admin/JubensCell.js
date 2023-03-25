import { Link, routes } from '@redwoodjs/router'

import Jubens from 'src/components/juben/Jubens'

export const QUERY = gql`
  query FindJubens {
    jubens {
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
      timeSlots {
        id
      }
      photos
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No jubens yet. '}
      <Link to={routes.newJuben()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ jubens }) => {
  return <Jubens jubens={jubens} />
}
