import { db } from 'src/lib/db'

export const timeSlots = () => {
  return db.timeSlot.findMany()
}

export const timeSlot = ({ id }) => {
  return db.timeSlot.findUnique({
    where: { id },
  })
}

export const createTimeSlot = ({ input }) => {
  return db.timeSlot.create({
    data: input,
  })
}

export const updateTimeSlot = ({ id, input }) => {
  return db.timeSlot.update({
    data: input,
    where: { id },
  })
}

export const deleteTimeSlot = ({ id }) => {
  return db.timeSlot.delete({
    where: { id },
  })
}

export const TimeSlot = {
  Booking: (_obj, { root }) =>
    db.timeSlot.findUnique({ where: { id: root.id } }).Booking(),
}
