import JubenInSearch from 'src/components/Juben/JubenInSearch'

export const QUERY = gql`
  query searchJubens($input: SearchJubensInput) {
    searchJubens(input: $input) {
      id
      name
      desc
      sections
      image
      score
      players
      price
      drives{
        id
        date
        status
        male
        female
        total
        timeSlot {
          id
          start
          end
        }
      }
      timeSlots {
        id
        start
        end
        last
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ searchJubens }) => {
  return (
    <div className="lg:max-w-screen-md mx-auto pt-10">
      {searchJubens.map((item) => {
        return <JubenInSearch key={item.id} juben={item} />
      })}
    </div>
  )
}
