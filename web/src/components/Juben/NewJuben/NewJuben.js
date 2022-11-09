import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import JubenForm from 'src/components/Juben/JubenForm'

const CREATE_JUBEN_MUTATION = gql`
  mutation CreateJubenMutation($input: CreateJubenInput!) {
    createJuben(input: $input) {
      id
    }
  }
`

const NewJuben = () => {
  const [createJuben, { loading, error }] = useMutation(CREATE_JUBEN_MUTATION, {
    onCompleted: () => {
      toast.success('Juben created')
      navigate(routes.jubens())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createJuben({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Juben</h2>
      </header>
      <div className="rw-segment-main">
        <JubenForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewJuben
