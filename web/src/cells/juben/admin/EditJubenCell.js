import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JubenForm from '../../../components/juben/JubenForm'

export const QUERY = gql`
  query EditJubenById($id: Int!) {
    juben: juben(id: $id) {
      id
      name
      score
      image
      desc
      section
      sections
      players
      canSwitchSex
      duration
      price
      mvps {
        id
      }
      photos
      available
    }
  }
`
const UPDATE_JUBEN_MUTATION = gql`
  mutation UpdateJubenMutation($id: Int!, $input: UpdateJubenInput!) {
    updateJuben(id: $id, input: $input) {
      id
      name
      score
      image
      desc
      section
      sections
      players
      canSwitchSex
      duration
      price
      mvps {
        id
      }
      photos
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ juben, refetch }) => {
  const [updateJuben, { loading, error }] = useMutation(UPDATE_JUBEN_MUTATION, {
    onCompleted: () => {
      toast.success('Juben updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Juben {juben.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <JubenForm
          juben={juben}
          onSave={(input, id) => {
            updateJuben({ variables: { id, input } })
          }}
          error={error}
          loading={loading}
          refetch={refetch}
        />
      </div>
    </div>
  )
}
