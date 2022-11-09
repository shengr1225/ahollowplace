import Booking from 'src/components/Booking/Booking'

export const QUERY = gql`
  query FindBookingById($id: Int!) {
    booking: booking(id: $id) {
      id
      date
      male
      female
      total
      note
      juben {
        name
      }
      timeSlot {
        start
        end
        last
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Booking not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ booking }) => {
  return <Booking booking={booking} />
}
