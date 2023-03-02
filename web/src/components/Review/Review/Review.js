import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReviewMutation($id: Int!) {
    deleteReview(id: $id) {
      id
    }
  }
`

const Review = ({ review }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Review deleted')
      navigate(routes.reviews())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete review ' + id + '?')) {
      deleteReview({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Review {review.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{review.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(review.createdAt)}</td>
            </tr>
            <tr>
              <th>Juben id</th>
              <td>{review.jubenId}</td>
            </tr>
            <tr>
              <th>Rate of juben</th>
              <td>{review.rateOfJuben}</td>
            </tr>
            <tr>
              <th>Review of juben</th>
              <td>{review.reviewOfJuben}</td>
            </tr>
            <tr>
              <th>Rate of dm</th>
              <td>{review.rateOfDM}</td>
            </tr>
            <tr>
              <th>Review of dm</th>
              <td>{review.reviewOfDM}</td>
            </tr>
            <tr>
              <th>Rate of food</th>
              <td>{review.rateOfFood}</td>
            </tr>
            <tr>
              <th>Review of food</th>
              <td>{review.reviewOfFood}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReview({ id: review.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(review.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Review
