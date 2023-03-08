import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { Toaster } from '@redwoodjs/web/dist/toast'

import NewReviewForm from 'src/components/Review/NewReviewForm/newReviewForm'

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
    }
  }
`

const LeaveReviewPage = ({ jubenId, dm }) => {
  const [createReview, { loading }] = useMutation(CREATE_REVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('感谢你的评价, 谢谢你对洞屋剧本杀的支持')
      setTimeout(() => {
        navigate(routes.home())
      }, 2000)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (input) => {
    input.createdAt = new Date()
    createReview({ variables: { input } })
  }

  return (
    <>
      <MetaTags title="Leave a review" description="LeaveReview page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <NewReviewForm
        jubenId={jubenId}
        dm={dm}
        onSubmit={onSubmit}
        loading={loading}
      />
    </>
  )
}

export default LeaveReviewPage
