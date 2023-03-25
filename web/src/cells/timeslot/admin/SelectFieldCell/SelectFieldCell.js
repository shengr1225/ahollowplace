import { useState } from 'react'

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

export const Success = ({ timeSlots, name, selectTimeSlots, multiple }) => {
  const [selection, setSelection] = useState(selectTimeSlots?.map((t) => t.id))
  return (
    <SelectField
      name={name}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
      multiple={!!multiple}
      value={selection}
      onChange={(event) => {
        setSelection([...event.target.selectedOptions].map((s) => s.value))
      }}
    >
      <option value="-1">选择时间</option>
      {timeSlots.map((t) => (
        <option key={t.id} value={t.id}>
          {t.start + '-' + t.end + '(' + t.last + 'h)'}
        </option>
      ))}
    </SelectField>
  )
}
