export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    bookings: [Booking]!
    JubenDrive: JubenDrive
    jubenDriveId: Int
    thumbnail: String
    desc: String
    label: String
    ability: Int
    tuili: Float
    yanji: Float
    xiezuo: Float
    gaoxiao: Float
    qinggan: Float
    knot: String
    mvpJubens: [Juben]
    currentExp: Int
    isMVP: Boolean
    MVPUntil: DateTime
    webAuthnChallenge: String
    reviews: [Review]!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    jubenDriveId: Int
    thumbnail: String
    desc: String
    label: String
    ability: Int
    tuili: Float
    yanji: Float
    xiezuo: Float
    gaoxiao: Float
    qinggan: Float
    knot: String
  }

  input UpdateUserInput {
    name: String
    email: String
    jubenDriveId: Int
    thumbnail: String
    desc: String
    label: String
    ability: Int
    tuili: Float
    yanji: Float
    xiezuo: Float
    gaoxiao: Float
    qinggan: Float
    knot: String
    currentExp: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth
  }
`
