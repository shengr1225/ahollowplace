import {
  reviews,
  review,
  createReview,
  updateReview,
  deleteReview,
} from './reviews'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reviews', () => {
  scenario('returns all reviews', async (scenario) => {
    const result = await reviews()

    expect(result.length).toEqual(Object.keys(scenario.review).length)
  })

  scenario('returns a single review', async (scenario) => {
    const result = await review({ id: scenario.review.one.id })

    expect(result).toEqual(scenario.review.one)
  })

  scenario('creates a review', async (scenario) => {
    const result = await createReview({
      input: {
        createdAt: '2023-03-01T23:18:48.504Z',
        jubenId: scenario.review.two.jubenId,
        rateOfJuben: 3094901,
        reviewOfJuben: 'String',
        rateOfDM: 3741166,
        reviewOfDM: 'String',
        rateOfFood: 3701709,
        reviewOfFood: 'String',
      },
    })

    expect(result.createdAt).toEqual(new Date('2023-03-01T23:18:48.504Z'))
    expect(result.jubenId).toEqual(scenario.review.two.jubenId)
    expect(result.rateOfJuben).toEqual(3094901)
    expect(result.reviewOfJuben).toEqual('String')
    expect(result.rateOfDM).toEqual(3741166)
    expect(result.reviewOfDM).toEqual('String')
    expect(result.rateOfFood).toEqual(3701709)
    expect(result.reviewOfFood).toEqual('String')
  })

  scenario('updates a review', async (scenario) => {
    const original = await review({ id: scenario.review.one.id })
    const result = await updateReview({
      id: original.id,
      input: { createdAt: '2023-03-02T23:18:48.504Z' },
    })

    expect(result.createdAt).toEqual(new Date('2023-03-02T23:18:48.504Z'))
  })

  scenario('deletes a review', async (scenario) => {
    const original = await deleteReview({
      id: scenario.review.one.id,
    })
    const result = await review({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('creates a review by login user', async (scenario) => {
    const result = await createReview({
      input: {
        createdAt: '2023-03-01T23:18:48.504Z',
        jubenId: scenario.review.two.jubenId,
        rateOfJuben: 3094901,
        reviewOfJuben: 'String',
        rateOfDM: 3741166,
        reviewOfDM: 'String',
        rateOfFood: 3701709,
        reviewOfFood: 'String',
        userId: scenario.user.bob.id,
      },
    })

    expect(result.createdAt).toEqual(new Date('2023-03-01T23:18:48.504Z'))
    expect(result.jubenId).toEqual(scenario.review.two.jubenId)
    expect(result.rateOfJuben).toEqual(3094901)
    expect(result.reviewOfJuben).toEqual('String')
    expect(result.rateOfDM).toEqual(3741166)
    expect(result.reviewOfDM).toEqual('String')
    expect(result.rateOfFood).toEqual(3701709)
    expect(result.reviewOfFood).toEqual('String')
    expect(result.userId).toEqual(scenario.user.bob.id)
  })
})
