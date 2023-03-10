import { Link, routes } from '@redwoodjs/router'

import Bookings from 'src/components/booking/Bookings'

export const QUERY = gql`
  query FindBookings {
    bookings {
      id
      date
      male
      female
      total
      note
      jubenId
      timeSlotId
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookings yet. '}
      <Link to={routes.newBooking()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ bookings }) => {
  return <Bookings bookings={bookings} />
}
