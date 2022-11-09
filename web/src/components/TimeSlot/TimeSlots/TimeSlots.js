import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/TimeSlot/TimeSlotsCell'

const DELETE_TIME_SLOT_MUTATION = gql`
  mutation DeleteTimeSlotMutation($id: Int!) {
    deleteTimeSlot(id: $id) {
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

const TimeSlotsList = ({ timeSlots }) => {
  const [deleteTimeSlot] = useMutation(DELETE_TIME_SLOT_MUTATION, {
    onCompleted: () => {
      toast.success('TimeSlot deleted')
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
    if (confirm('Are you sure you want to delete timeSlot ' + id + '?')) {
      deleteTimeSlot({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Start</th>
            <th>End</th>
            <th>Last</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot.id}>
              <td>{truncate(timeSlot.id)}</td>
              <td>{truncate(timeSlot.start)}</td>
              <td>{truncate(timeSlot.end)}</td>
              <td>{truncate(timeSlot.last)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.timeSlot({ id: timeSlot.id })}
                    title={'Show timeSlot ' + timeSlot.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTimeSlot({ id: timeSlot.id })}
                    title={'Edit timeSlot ' + timeSlot.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete timeSlot ' + timeSlot.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(timeSlot.id)}
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

export default TimeSlotsList
