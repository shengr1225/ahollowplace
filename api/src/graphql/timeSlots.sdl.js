export const schema = gql`
  type TimeSlot {
    id: Int!
    start: String!
    end: String!
    last: Int!
    onlyInWeekend: Boolean!
    Bookings: [Booking]!
    JubenDrives: [JubenDrive]!
  }

  type Query {
    timeSlots: [TimeSlot!]! @skipAuth
    timeSlot(id: Int!): TimeSlot @skipAuth
  }

  input CreateTimeSlotInput {
    start: String!
    end: String!
    last: Int!
  }

  input UpdateTimeSlotInput {
    start: String
    end: String
    last: Int
  }

  type Mutation {
    createTimeSlot(input: CreateTimeSlotInput!): TimeSlot! @skipAuth
    updateTimeSlot(id: Int!, input: UpdateTimeSlotInput!): TimeSlot! @skipAuth
    deleteTimeSlot(id: Int!): TimeSlot! @skipAuth
  }
`
