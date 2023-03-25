export const schema = gql`
  type Juben {
    id: Int!
    name: String!
    score: Float
    image: String!
    desc: String!
    section: String!
    sections: String!
    players: String!
    canSwitchSex: Boolean!
    duration: Int!
    price: Int!
    drives: [JubenDrive]!
    timeSlots: [TimeSlot]!
    mvps: [User]!
    photos: String
    available: Boolean!
  }

  type Query {
    jubens: [Juben!]! @skipAuth
    juben(id: Int!): Juben @skipAuth
    jubensByName(name: String!): [Juben]! @skipAuth
    searchJubens(input: SearchJubensInput): [Juben]! @skipAuth
  }

  input SearchJubensInput {
    name: String
    date: DateTime
    people: String
  }

  input CreateJubenInput {
    name: String!
    score: Float
    image: String!
    desc: String!
    section: String!
    sections: String!
    players: String!
    canSwitchSex: Boolean!
    duration: Int!
    price: Int!
    photos: String
    available: Boolean!
    mvps: [UserInput]
    timeSlots: [UserInput]
  }

  input UpdateJubenInput {
    name: String
    score: Float
    image: String
    desc: String
    section: String
    sections: String
    players: String
    canSwitchSex: Boolean
    duration: Int
    price: Int
    mvps: [UserInput]
    photos: String
    available: Boolean
    timeSlots: [UserInput]
  }

  input UserInput {
    id: Int
  }

  type Mutation {
    createJuben(input: CreateJubenInput!): Juben! @requireAuth
    updateJuben(id: Int!, input: UpdateJubenInput!): Juben! @requireAuth
    deletePhotoOfJuben(id: Int!, index: Int!): Juben! @requireAuth
    deleteJuben(id: Int!): Juben! @requireAuth
  }
`
