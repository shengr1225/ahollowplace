import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_TIME_SLOT_MUTATION = gql`
  mutation DeleteTimeSlotMutation($id: Int!) {
    deleteTimeSlot(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const TimeSlot = ({ timeSlot }) => {
  const [deleteTimeSlot] = useMutation(DELETE_TIME_SLOT_MUTATION, {
    onCompleted: () => {
      toast.success('TimeSlot deleted')
      navigate(routes.timeSlots())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete timeSlot ' + id + '?')) {
      deleteTimeSlot({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            TimeSlot {timeSlot.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{timeSlot.id}</td>
            </tr>
            <tr>
              <th>Start</th>
              <td>{timeSlot.start}</td>
            </tr>
            <tr>
              <th>End</th>
              <td>{timeSlot.end}</td>
            </tr>
            <tr>
              <th>Last</th>
              <td>{timeSlot.last}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTimeSlot({ id: timeSlot.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(timeSlot.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TimeSlot
