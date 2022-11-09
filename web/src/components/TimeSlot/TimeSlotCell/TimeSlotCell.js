import TimeSlot from 'src/components/TimeSlot/TimeSlot'

export const QUERY = gql`
  query FindTimeSlotById($id: Int!) {
    timeSlot: timeSlot(id: $id) {
      id
      start
      end
      last
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TimeSlot not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ timeSlot }) => {
  return <TimeSlot timeSlot={timeSlot} />
}
