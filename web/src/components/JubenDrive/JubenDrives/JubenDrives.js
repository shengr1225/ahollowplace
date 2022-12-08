import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/JubenDrive/JubenDrivesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_JUBEN_DRIVE_MUTATION = gql`
  mutation DeleteJubenDriveMutation($id: Int!) {
    deleteJubenDrive(id: $id) {
      id
    }
  }
`

const JubenDrivesList = ({ jubenDrives }) => {
  const [deleteJubenDrive] = useMutation(DELETE_JUBEN_DRIVE_MUTATION, {
    onCompleted: () => {
      toast.success('JubenDrive deleted')
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
    if (confirm('Are you sure you want to delete jubenDrive ' + id + '?')) {
      deleteJubenDrive({ variables: { id } })
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
            <th>Total</th>
            <th>Status</th>
            <th>Juben</th>
            <th>Time slot id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {jubenDrives.map((jubenDrive) => (
            <tr key={jubenDrive.id}>
              <td>{truncate(jubenDrive.id)}</td>
              <td>{timeTag(jubenDrive.date)}</td>
              <td>{truncate(jubenDrive.male)}</td>
              <td>{truncate(jubenDrive.female)}</td>
              <td>{truncate(jubenDrive.total)}</td>
              <td>{truncate(jubenDrive.status)}</td>
              <td>{truncate(jubenDrive.juben.name)}</td>
              <td>{truncate(jubenDrive.timeSlotId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.jubenDrive({ id: jubenDrive.id })}
                    title={'Show jubenDrive ' + jubenDrive.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJubenDrive({ id: jubenDrive.id })}
                    title={'Edit jubenDrive ' + jubenDrive.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete jubenDrive ' + jubenDrive.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(jubenDrive.id)}
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

export default JubenDrivesList
