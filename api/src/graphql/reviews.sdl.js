export const schema = gql`
  type Review {
    id: Int!
    createdAt: DateTime!
    dm: String
    jubenId: Int!
    juben: Juben!
    rateOfJuben: Int!
    reviewOfJuben: String
    rateOfDM: Int!
    reviewOfDM: String
    rateOfFood: Int
    reviewOfFood: String
  }

  type Query {
    reviews: [Review!]! @requireAuth
    review(id: Int!): Review @requireAuth
  }

  input CreateReviewInput {
    jubenId: Int!
    rateOfJuben: Int!
    reviewOfJuben: String
    rateOfDM: Int!
    reviewOfDM: String
    rateOfFood: Int
    reviewOfFood: String
    createdAt: DateTime
    dm: String
    userId: Int
  }

  input UpdateReviewInput {
    jubenId: Int
    rateOfJuben: Int
    reviewOfJuben: String
    rateOfDM: Int
    reviewOfDM: String
    rateOfFood: Int
    reviewOfFood: String
    dm: String
    userId: Int
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review! @requireAuth
    updateReview(id: Int!, input: UpdateReviewInput!): Review! @requireAuth
    deleteReview(id: Int!): Review! @requireAuth
  }
`
