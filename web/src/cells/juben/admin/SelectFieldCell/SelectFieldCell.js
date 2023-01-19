import { SelectField } from '@redwoodjs/forms'
export const QUERY = gql`
  query findJubens {
    jubens {
      id
      name
      available
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ id, jubens }) => {
  return (
    <SelectField
      name="jubenId"
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    >
      <option value="-1">选择剧本</option>
      <option value="">选择剧本</option>
      {jubens
        .filter((juben) => {
          return juben.available
        })
        .map((j) => (
          <option key={j.id} selected={j.id == id} value={j.id}>
            {j.name}
          </option>
        ))}
    </SelectField>
  )
}
