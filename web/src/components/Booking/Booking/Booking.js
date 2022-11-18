import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const Booking = ({ booking }) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
      navigate(routes.bookings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete booking ' + id + '?')) {
      deleteBooking({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Booking {booking.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{booking.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(booking.date)}</td>
            </tr>
            <tr>
              <th>Male</th>
              <td>{booking.male}</td>
            </tr>
            <tr>
              <th>Female</th>
              <td>{booking.female}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{booking.note}</td>
            </tr>
            <tr>
              <th>Juben name</th>
              <td>{booking.juben.name}</td>
            </tr>
            <tr>
              <th>Time slot</th>
              <td>
                From {booking.timeSlot.start} to {booking.timeSlot.end}, about{' '}
                {booking.timeSlot.last} hours
              </td>
            </tr>
            <tr>
              <th>User</th>
              <td>{booking.users.map((u) => u.name).join(',')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBooking({ id: booking.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(booking.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Booking
