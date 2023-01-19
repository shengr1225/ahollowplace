import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TimeSlotForm from 'src/components/timeSlot/TimeSlotForm'

const CREATE_TIME_SLOT_MUTATION = gql`
  mutation CreateTimeSlotMutation($input: CreateTimeSlotInput!) {
    createTimeSlot(input: $input) {
      id
    }
  }
`

const NewTimeSlot = () => {
  const [createTimeSlot, { loading, error }] = useMutation(
    CREATE_TIME_SLOT_MUTATION,
    {
      onCompleted: () => {
        toast.success('TimeSlot created')
        navigate(routes.timeSlots())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createTimeSlot({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TimeSlot</h2>
      </header>
      <div className="rw-segment-main">
        <TimeSlotForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTimeSlot
