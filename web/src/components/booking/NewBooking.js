import Moment from 'moment'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookingForm from 'src/components/booking/BookingForm'
import { getLocalTime } from 'src/utility/dateUtil'

const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBookingMutation($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`

const NewBooking = () => {
  const [createBooking, { loading, error }] = useMutation(
    CREATE_BOOKING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Booking created')
        navigate(routes.bookings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      jubenId: parseInt(input.jubenId),
      timeSlotId: parseInt(input.timeSlotId),
      date: getLocalTime(input.date),
    })
    createBooking({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Booking</h2>
      </header>
      <div className="rw-segment-main">
        <BookingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBooking
