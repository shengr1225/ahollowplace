import { SelectField } from '@redwoodjs/forms'
export const QUERY = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, data, name }) => {
  return (
    <SelectField
      multiple
      name={name}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    >
      <option value="-1">选择用户</option>
      {users.map((u) => (
        <option
          key={u.id}
          selected={data?.some((d) => d.id == u.id)}
          value={u.id}
        >
          {u.name}
        </option>
      ))}
    </SelectField>
  )
}
