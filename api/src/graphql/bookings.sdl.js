export const schema = gql`
  type Booking {
    id: Int!
    date: DateTime!
    total: Int
    male: Int
    female: Int
    note: String
    juben: Juben!
    jubenId: Int!
    timeSlot: TimeSlot!
    timeSlotId: Int!
    status: String!
    users: [User]!
  }

  type Query {
    bookings: [Booking!]! @skipAuth
    activeBookings: [Booking!]! @skipAuth
    booking(id: Int!): Booking @skipAuth
  }

  input CreateBookingInput {
    date: DateTime!
    total: Int!
    male: Int!
    female: Int!
    note: String
    jubenId: Int!
    timeSlotId: Int!
    users: [UserInput!]!
  }

  input UpdateBookingInput {
    date: DateTime
    total: Int!
    male: Int!
    female: Int!
    note: String
    jubenId: Int!
    timeSlotId: Int!
    users: [UserInput!]!
  }

  input UserInput {
    id: Int
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking! @skipAuth
    updateBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
    deleteBooking(id: Int!): Booking! @requireAuth
  }
`
