import { juben } from '../jubens/jubens'

import {
  bookings,
  booking,
  createBooking,
  updateBooking,
  deleteBooking,
} from './bookings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookings', () => {
  // scenario('returns all bookings', async (scenario) => {
  //   const result = await bookings()
  //   expect(result.length).toEqual(Object.keys(scenario.booking).length)
  // })
  // scenario('returns a single booking', async (scenario) => {
  //   const result = await booking({ id: scenario.booking.one.id })
  //   expect(result).toMatchObject(scenario.booking.one)
  // })
  // scenario('creates a booking', async (scenario) => {
  //   const result = await createBooking({
  //     input: {
  //       date: new Date('2023-10-16T20:08:11.000Z'),
  //       total: 5,
  //       male: 3,
  //       female: 2,
  //       users: [{ id: scenario.user.bob.id }],
  //       jubenId: scenario.booking.one.jubenId,
  //       timeSlotId: scenario.booking.one.timeSlotId,
  //     },
  //   })
  //   expect(result.date).toEqual(new Date('2023-10-16T20:08:11.000Z'))
  //   expect(result.total).toEqual(5)
  //   expect(result.status).toEqual('Carpooling')
  //   expect(result.jubenId).toEqual(scenario.booking.one.jubenId)
  //   expect(result.timeSlotId).toEqual(scenario.booking.one.timeSlotId)
  // })

  // scenario('creates a booking but full', async (scenario) => {
  //   await createBooking({
  //     input: {
  //       date: new Date('2023-10-18T20:08:11.000Z'),
  //       total: 4,
  //       male: 4,
  //       female: 0,
  //       users: [{ id: scenario.user.bob.id }],
  //       jubenId: scenario.booking.one.jubenId,
  //       timeSlotId: scenario.booking.one.timeSlotId,
  //     },
  //   })
  //   expect(async () => {
  //     await createBooking({
  //       input: {
  //         date: new Date('2023-10-18T20:08:11.000Z'),
  //         total: 2,
  //         male: 0,
  //         female: 2,
  //         users: [{ id: scenario.user.alice.id }],
  //         jubenId: scenario.booking.one.jubenId,
  //         timeSlotId: scenario.booking.one.timeSlotId,
  //       },
  //     })
  //   }).rejects.toThrow('本剧本预定已满，请修改时间或者人数。')
  // })

  // scenario('creates a booking that already booked', async (scenario) => {
  //   await createBooking({
  //     input: {
  //       date: new Date('2023-10-18T20:08:11.000Z'),
  //       total: 1,
  //       male: 1,
  //       female: 0,
  //       users: [{ id: scenario.user.bob.id }],
  //       jubenId: scenario.booking.one.jubenId,
  //       timeSlotId: scenario.booking.one.timeSlotId,
  //     },
  //   })
  //   expect(async () => {
  //     await createBooking({
  //       input: {
  //         date: new Date('2023-10-19T20:08:11.000Z'),
  //         total: 1,
  //         male: 1,
  //         female: 0,
  //         users: [{ id: scenario.user.bob.id }],
  //         jubenId: scenario.booking.one.jubenId,
  //         timeSlotId: scenario.booking.one.timeSlotId,
  //       },
  //     })
  //   }).rejects.toThrow('你已经预订了相同的剧本，如需调整请前往我的剧本。')
  // })
  // scenario('creates a booking that has wrong people info', async (scenario) => {
  //   expect(async () => {
  //     await createBooking({
  //       input: {
  //         date: new Date('2023-10-15T20:08:11.000Z'),
  //         total: 5,
  //         male: 0,
  //         female: 4,
  //         userId: scenario.booking.one.userId,
  //         jubenId: scenario.booking.one.jubenId,
  //         timeSlotId: scenario.booking.one.timeSlotId,
  //       },
  //     })
  //   }).rejects.toThrow('请提供正确人数信息')
  // })
  scenario('updates a booking and then full', async (scenario) => {
    const original = await booking({ id: scenario.booking.one.id })
    const result = await updateBooking({
      id: original.id,
      input: {
        date: new Date('2023-10-15T20:08:11Z'),
        jubenId: scenario.booking.one.jubenId,
        total: 10,
        male: 9,
        female: 1,
        timeSlotId: scenario.booking.one.timeSlotId,
      },
    })
    expect(result.date).toEqual(new Date('2023-10-15T20:08:11Z'))
    expect(result.total).toEqual(10)
    expect(result.male).toEqual(9)
    expect(result.female).toEqual(1)
  })

  scenario('updates a booking but full', async (scenario) => {
    const original = await booking({ id: scenario.booking.one.id })
    expect(async () => {
      await updateBooking({
        id: original.id,
        input: {
          date: new Date('2023-10-15T20:08:11Z'),
          jubenId: scenario.booking.one.jubenId,
          total: 11,
          male: 10,
          female: 1,
          timeSlotId: scenario.booking.one.timeSlotId,
        },
      })
    }).rejects.toThrow('本剧本预定人数超过限制，请修改人数。')
  })

  scenario('get certain field of a booking', async (scenario) => {
    const result = await booking({ id: scenario.booking.one.id })
    expect(result.juben).toEqual(expect.anything())
    expect(result.timeSlot).toEqual(expect.anything())
    expect(result.users).toEqual(expect.anything())
    expect(result.total).toEqual(5)
  })

  // scenario('create a booking at a past time', async (scenario) => {
  //   expect(async () => {
  //     await createBooking({
  //       input: {
  //         date: new Date('2021-10-15T20:08:11.000Z'),
  //         total: 5,
  //         male: 3,
  //         female: 2,
  //         userId: scenario.booking.one.userId,
  //         jubenId: scenario.booking.one.jubenId,
  //         timeSlotId: scenario.booking.one.timeSlotId,
  //       },
  //     })
  //   }).rejects.toThrow('预定时间不能是过去')
  // })
  // scenario('deletes a booking', async (scenario) => {
  //   const original = await deleteBooking({ id: scenario.booking.one.id })
  //   const result = await booking({ id: original.id })
  //   expect(result).toEqual(null)
  // })
})
