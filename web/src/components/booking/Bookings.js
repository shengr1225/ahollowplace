import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/cells/booking/admin/BookingsCell'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const BookingsList = ({ bookings }) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete booking ' + id + '?')) {
      deleteBooking({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Male</th>
            <th>Female</th>
            <th>Note</th>
            <th>Juben id</th>
            <th>Time slot id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{truncate(booking.id)}</td>
              <td>{timeTag(booking.date)}</td>
              <td>{truncate(booking.male)}</td>
              <td>{truncate(booking.female)}</td>
              <td>{truncate(booking.note)}</td>
              <td>{truncate(booking.jubenId)}</td>
              <td>{truncate(booking.timeSlotId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.booking({ id: booking.id })}
                    title={'Show booking ' + booking.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBooking({ id: booking.id })}
                    title={'Edit booking ' + booking.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete booking ' + booking.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(booking.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingsList
