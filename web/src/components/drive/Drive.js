import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_JUBEN_DRIVE_MUTATION = gql`
  mutation DeleteJubenDriveMutation($id: Int!) {
    deleteJubenDrive(id: $id) {
      id
    }
  }
`

const JubenDrive = ({ jubenDrive }) => {
  const [deleteJubenDrive] = useMutation(DELETE_JUBEN_DRIVE_MUTATION, {
    onCompleted: () => {
      toast.success('JubenDrive deleted')
      navigate(routes.jubenDrives())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete jubenDrive ' + id + '?')) {
      deleteJubenDrive({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            JubenDrive {jubenDrive.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{jubenDrive.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(jubenDrive.date)}</td>
            </tr>
            <tr>
              <th>Male</th>
              <td>{jubenDrive.male}</td>
            </tr>
            <tr>
              <th>Female</th>
              <td>{jubenDrive.female}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{jubenDrive.total}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{jubenDrive.status}</td>
            </tr>
            <tr>
              <th>Juben</th>
              <td>{jubenDrive.juben.name}</td>
            </tr>
            <tr>
              <th>Time slot id</th>
              <td>{jubenDrive.timeSlotId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJubenDrive({ id: jubenDrive.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(jubenDrive.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default JubenDrive
