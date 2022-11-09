import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import TimeSlotForm from 'src/components/TimeSlot/TimeSlotForm'

export const QUERY = gql`
  query EditTimeSlotById($id: Int!) {
    timeSlot: timeSlot(id: $id) {
      id
      start
      end
      last
    }
  }
`
const UPDATE_TIME_SLOT_MUTATION = gql`
  mutation UpdateTimeSlotMutation($id: Int!, $input: UpdateTimeSlotInput!) {
    updateTimeSlot(id: $id, input: $input) {
      id
      start
      end
      last
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ timeSlot }) => {
  const [updateTimeSlot, { loading, error }] = useMutation(
    UPDATE_TIME_SLOT_MUTATION,
    {
      onCompleted: () => {
        toast.success('TimeSlot updated')
        navigate(routes.timeSlots())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateTimeSlot({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit TimeSlot {timeSlot.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TimeSlotForm
          timeSlot={timeSlot}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
