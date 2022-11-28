import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JubenDriveForm from 'src/components/JubenDrive/JubenDriveForm'

const CREATE_JUBEN_DRIVE_MUTATION = gql`
  mutation CreateJubenDriveMutation($input: CreateJubenDriveInput!) {
    createJubenDrive(input: $input) {
      id
    }
  }
`

const NewJubenDrive = () => {
  const [createJubenDrive, { loading, error }] = useMutation(
    CREATE_JUBEN_DRIVE_MUTATION,
    {
      onCompleted: () => {
        toast.success('JubenDrive created')
        navigate(routes.jubenDrives())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createJubenDrive({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New JubenDrive</h2>
      </header>
      <div className="rw-segment-main">
        <JubenDriveForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewJubenDrive
