export const schema = gql`
  type JubenDrive {
    id: Int!
    date: DateTime!
    bookings: [Booking]!
    users: [User]!
    male: Int
    female: Int
    total: Int
    juben: Juben
    status: String
    jubenId: Int
    timeSlotId: Int!
    timeSlot: TimeSlot!
  }

  type Query {
    jubenDrives: [JubenDrive!]! @skipAuth
    jubenDrive(id: Int!): JubenDrive @skipAuth
  }

  input CreateJubenDriveInput {
    date: DateTime!
    male: Int!
    female: Int!
    total: Int!
    status: String
    jubenId: Int!
    timeSlotId: Int!
    bookings: [BookingInput!]!
    userInput: [UserInput!]!
  }

  input UpdateJubenDriveInput {
    date: DateTime!
    male: Int!
    female: Int!
    total: Int!
    jubenId: Int!
    timeSlotId: Int!
    status: Int
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
    createJubenDrive(input: CreateJubenDriveInput!): JubenDrive! @skipAuth
    updateJubenDrive(id: Int!, input: UpdateJubenDriveInput!): JubenDrive!
      @skipAuth
    deleteJubenDrive(id: Int!): JubenDrive! @skipAuth
  }
`
