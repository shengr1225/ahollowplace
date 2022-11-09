import gql from 'graphql-tag'

import { createTransformerDirective } from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @combinedSameBookings on FIELD_DEFINITION
`

const combineFun = ({ _, resolvedValue }) => {
  var i = 0
  var cBookings = resolvedValue?.length ? [resolvedValue[0]] : []
  if (resolvedValue?.length) {
    resolvedValue.forEach((booking, index) => {
      const ofSameTime = cBookings.filter((b) => {
        return (
          b.date.getTime() == booking.date.getTime() &&
          b.timeSlotId == booking.timeSlotId
        )
      })

      if (index > 0) {
        if (ofSameTime.length) {
          i++
          ofSameTime[0].male += booking.male
          ofSameTime[0].female += booking.female
          ofSameTime[0].total = ofSameTime[0].male + ofSameTime[0].female
        } else {
          cBookings.push(booking)
        }
      }
    })
  }
  console.log(`successfully combined ${i} bookings`)
  return cBookings
}

const combinedSameBookings = createTransformerDirective(schema, combineFun)

export default combinedSameBookings
