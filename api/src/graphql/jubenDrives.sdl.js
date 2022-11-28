export const schema = gql`
  type JubenDrive {
    id: Int!
    date: DateTime!
    male: Int!
    female: Int!
    total: Int!
    juben: Juben!
    timeSlot: TimeSlot!
    users: [User]!
    bookings: [Booking]!
    status: String!
    jubenId: Int!
    timeSlotId: Int!
  }

  type Query {
    jubenDrives: [JubenDrive!]! @requireAuth
    jubenDrive(id: Int!): JubenDrive @requireAuth
  }

  input CreateJubenDriveInput {
    date: DateTime!
    male: Int!
    female: Int!
    total: Int!
    status: String!
    jubenId: Int!
    timeSlotId: Int!
    bookings: [BookingInput!]!
    users: [UserInput!]!
  }

  input UpdateJubenDriveInput {
    date: DateTime
    male: Int
    female: Int
    total: Int
    status: String
    jubenId: Int
    timeSlotId: Int
    bookings: [BookingInput!]!
    users: [UserInput!]!
  }

  input BookingInput {
    id: Int
  }

  input UserInput {
    id: Int
  }

  type Mutation {
    createJubenDrive(input: CreateJubenDriveInput!): JubenDrive! @requireAuth
    updateJubenDrive(id: Int!, input: UpdateJubenDriveInput!): JubenDrive!
      @requireAuth
    deleteJubenDrive(id: Int!): JubenDrive! @requireAuth
  }
`
