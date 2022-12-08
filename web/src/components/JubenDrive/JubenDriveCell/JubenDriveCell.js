import JubenDrive from 'src/components/JubenDrive/JubenDrive'

export const QUERY = gql`
  query FindJubenDriveById($id: Int!) {
    jubenDrive: jubenDrive(id: $id) {
      id
      date
      male
      female
      total
      status
      juben {
        name
      }
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
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>JubenDrive not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ jubenDrive }) => {
  return <JubenDrive jubenDrive={jubenDrive} />
}
