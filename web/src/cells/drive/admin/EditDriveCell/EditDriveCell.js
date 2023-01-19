import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JubenDriveForm from 'src/components/drive/DriveForm'

export const QUERY = gql`
  query EditJubenDriveById($id: Int!) {
    jubenDrive: jubenDrive(id: $id) {
      id
      date
      male
      female
      total
      status
      jubenId
      timeSlotId
      users {
        id
        name
        email
      }
      bookings {
        id
        male
        female
        note
      }
    }
  }
`
const UPDATE_JUBEN_DRIVE_MUTATION = gql`
  mutation UpdateJubenDriveMutation($id: Int!, $input: UpdateJubenDriveInput!) {
    updateJubenDrive(id: $id, input: $input) {
      id
      date
      male
      female
      total
      status
      jubenId
      timeSlotId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ jubenDrive }) => {
  const [updateJubenDrive, { loading, error }] = useMutation(
    UPDATE_JUBEN_DRIVE_MUTATION,
    {
      onCompleted: () => {
        toast.success('JubenDrive updated')
        navigate(routes.jubenDrives())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateJubenDrive({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit JubenDrive {jubenDrive?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <JubenDriveForm
          jubenDrive={jubenDrive}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
