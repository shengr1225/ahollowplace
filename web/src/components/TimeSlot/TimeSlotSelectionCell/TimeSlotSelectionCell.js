import { SelectField } from '@redwoodjs/forms'
export const QUERY = gql`
  query findTimeSlots {
    timeSlots {
      id
      start
      end
      last
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ timeSlots, selectTimeSlotId }) => {
  return (
    <SelectField
      name="timeSlotId"
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    >
      <option value="-1">选择时间</option>
      {timeSlots.map((t) => (
        <option
          key={t.id}
          selected={timeSlots.some(
            (timeSlot) => timeSlot.id == selectTimeSlotId
          )}
          value={t.id}
        >
          {t.start + '-' + t.end + '(' + t.last + 'h)'}
        </option>
      ))}
    </SelectField>
  )
}
