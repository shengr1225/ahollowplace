import { Link, routes } from '@redwoodjs/router'

import TimeSlots from 'src/components/TimeSlot/TimeSlots'

export const QUERY = gql`
  query FindTimeSlots {
    timeSlots {
      id
      start
      end
      last
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No timeSlots yet. '}
      <Link to={routes.newTimeSlot()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ timeSlots }) => {
  return <TimeSlots timeSlots={timeSlots} />
}
