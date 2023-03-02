import Review from 'src/components/Review/Review'

export const QUERY = gql`
  query FindReviewById($id: Int!) {
    review: review(id: $id) {
      id
      createdAt
      jubenId
      rateOfJuben
      reviewOfJuben
      rateOfDM
      reviewOfDM
      rateOfFood
      reviewOfFood
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Review not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ review }) => {
  return <Review review={review} />
}
