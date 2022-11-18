import { ServiceValidationError } from '@redwoodjs/api'

import { createBooking, updateBooking } from '../bookings/bookings'
import { searchJubens, juben } from '../jubens/jubens'

import {
  jubenDrives,
  jubenDrive,
  createJubenDrive,
  updateJubenDrive,
  deleteJubenDrive,
} from './jubenDrives'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('jubenDrives', () => {
  // scenario('returns all jubenDrives', async (scenario) => {
  //   const result = await jubenDrives()

  //   expect(result.length).toEqual(Object.keys(scenario.jubenDrive).length)
  // })

  // scenario('returns a single jubenDrive', async (scenario) => {
  //   const result = await jubenDrive({ id: scenario.jubenDrive.one.id })

  //   expect(result).toEqual(scenario.jubenDrive.one)
  // })

  // scenario('updates a jubenDrive', async (scenario) => {
  //   const original = await jubenDrive({ id: scenario.jubenDrive.one.id })
  //   const result = await updateJubenDrive({
  //     id: original.id,
  //     input: { date: '2022-07-16T17:27:40Z' },
  //   })

  //   expect(result.date).toEqual('2022-07-16T17:27:40Z')
  // })

  // scenario('deletes a jubenDrive', async (scenario) => {
  //   const original = await deleteJubenDrive({ id: scenario.jubenDrive.one.id })
  //   const result = await jubenDrive({ id: original.id })

  //   expect(result).toEqual(null)
  // })

  scenario('create a new booking and new drive', async (scenario) => {
    const result = await createBooking({
      input: {
        date: new Date('2023-10-15T20:08:11.000Z'),
        total: 1,
        male: 1,
        female: 0,
        users: [{ id: scenario.user.bob.id }],
        jubenId: scenario.booking.one.jubenId,
        timeSlotId: scenario.booking.one.timeSlotId,
      },
    })
    var drives = await jubenDrives()
    expect(drives.length).toEqual(1)
    expect(drives[0].jubenId).toEqual(result.jubenId)
  })

  scenario('create two booking with the same drive', async (scenario) => {
    const result = await createBooking({
      input: {
        date: new Date('2023-10-15T20:08:11.000Z'),
        total: 5,
        male: 4,
        female: 1,
        users: [
          { id: scenario.user.bob.id },
          { id: scenario.user.bob.id },
          { id: scenario.user.bob.id },
          { id: scenario.user.bob.id },
          { id: scenario.user.aimee.id },
        ],
        jubenId: scenario.booking.one.jubenId,
        timeSlotId: scenario.booking.one.timeSlotId,
      },
    })

    var drives = await jubenDrives()
    expect(drives.length).toBeGreaterThan(0)
    var myDrives = drives.filter((drive) => {
      return drive.bookings.some((b) => {
        return b.id === result.id
      })
    })
    expect(myDrives.length).toEqual(1)
    expect(myDrives[0].total).toEqual(result.total)
    expect(myDrives[0].status).toEqual(scenario.booking.one.status)

    await createBooking({
      input: {
        date: new Date('2023-10-15T20:08:11.000Z'),
        total: 5,
        male: 3,
        female: 2,
        users: [
          { id: scenario.user.alice.id },
          { id: scenario.user.alice.id },
          { id: scenario.user.alice.id },
          { id: scenario.user.alice.id },
          { id: scenario.user.alice.id },
        ],
        jubenId: scenario.booking.one.jubenId,
        timeSlotId: scenario.booking.one.timeSlotId,
      },
    })
    drives = await jubenDrives()
    myDrives = drives.filter((drive) => {
      return drive.bookings.some((b) => {
        return b.id === result.id
      })
    })
    expect(myDrives.length).toEqual(1)
    expect(myDrives[0].total).toEqual(10)
    expect(myDrives[0].status).toEqual('Locked')
  })

  scenario(
    'create one booking and another booking but full',
    async (scenario) => {
      const result = await createBooking({
        input: {
          date: new Date('2023-10-15T20:08:11.000Z'),
          total: 5,
          male: 3,
          female: 2,
          users: [
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
          ],
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
        },
      })

      await expect(
        createBooking({
          input: {
            date: new Date('2023-10-15T20:08:11.000Z'),
            total: 6,
            male: 3,
            female: 3,
            users: [
              { id: scenario.user.alice.id },
              { id: scenario.user.alice.id },
              { id: scenario.user.alice.id },
              { id: scenario.user.alice.id },
              { id: scenario.user.alice.id },
              { id: scenario.user.alice.id },
            ],

            jubenId: scenario.booking.one.jubenId,
            timeSlotId: scenario.booking.one.timeSlotId,
          },
        })
      ).rejects.toThrow('本剧本预定已满，请修改时间或者人数。')

      const drives = await jubenDrives()
      const myDrives = drives.filter((drive) => {
        return drive.bookings.some((b) => {
          return b.id === result.id
        })
      })
      expect(myDrives.length).toEqual(1)
      expect(myDrives[0].total).toEqual(5)
      expect(myDrives[0].status).toEqual('Carpooling')
    }
  )

  scenario(
    'create one booking and update it to a larger total',
    async (scenario) => {
      const b1 = await createBooking({
        input: {
          date: new Date('2023-10-17T20:08:11.000Z'),
          total: 2,
          male: 1,
          female: 1,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [{ id: scenario.user.bob.id }, { id: scenario.user.bob.id }],
        },
      })
      await updateBooking({
        id: b1.id,
        input: {
          date: new Date('2023-10-17T20:08:11.000Z'),
          total: 3,
          male: 2,
          female: 1,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
          ],
        },
      })
      const drives = await jubenDrives()
      const myDrives = drives.filter((drive) => {
        return drive.bookings.some((b) => {
          return b.id === b1.id
        })
      })
      expect(drives.length).toEqual(1)
      expect(myDrives.length).toEqual(1)
      expect(myDrives[0].total).toEqual(3)
      expect(myDrives[0].status).toEqual('Carpooling')
    }
  )

  scenario(
    'create two bookings and update one booking to another time',
    async (scenario) => {
      const b1 = await createBooking({
        input: {
          date: new Date('2023-10-18T20:08:11.000Z'),
          total: 5,
          male: 3,
          female: 2,
          userId: scenario.booking.one.userId,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
          ],
        },
      })
      const b2 = await createBooking({
        input: {
          date: new Date('2023-10-18T20:08:11.000Z'),
          total: 5,
          male: 3,
          female: 2,
          userId: scenario.booking.one.userId,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
          ],
        },
      })
      await updateBooking({
        id: b1.id,
        input: {
          date: new Date('2023-10-19T20:08:11.000Z'),
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          total: 5,
          male: 4,
          female: 1,
          users: [
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
          ],
        },
      })

      const drives = await jubenDrives()
      const drive1 = drives.filter((drive) => {
        return drive.bookings.some((b) => {
          return b.id === b1.id
        })
      })[0]
      const drive2 = drives.filter((drive) => {
        return drive.bookings.some((b) => {
          return b.id === b2.id
        })
      })[0]

      expect(drives.length).toEqual(2)
      expect(drive1.bookings.length).toEqual(1)
      expect(drive2.bookings.length).toEqual(1)
      expect(drive1.total).toEqual(5)
      expect(drive1.status).toEqual('Carpooling')
      expect(drive2.total).toEqual(5)
      expect(drive2.status).toEqual('Carpooling')
    }
  )

  scenario(
    'create three bookings with two different drives and update one to another existing drive',
    async (scenario) => {
      const b1 = await createBooking({
        input: {
          date: new Date('2023-10-18T20:08:11.000Z'),
          total: 5,
          male: 3,
          female: 2,
          userId: scenario.booking.one.userId,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
          ],
        },
      })
      const b2 = await createBooking({
        input: {
          date: new Date('2023-10-18T20:08:11.000Z'),
          total: 5,
          male: 3,
          female: 2,
          userId: scenario.booking.one.userId,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
            { id: scenario.user.alice.id },
          ],
        },
      })
      await createBooking({
        input: {
          date: new Date('2023-10-19T20:08:11.000Z'),
          total: 5,
          male: 3,
          female: 2,
          userId: scenario.booking.one.userId,
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          users: [
            { id: scenario.user.aimee.id },
            { id: scenario.user.aimee.id },
            { id: scenario.user.aimee.id },
            { id: scenario.user.aimee.id },
            { id: scenario.user.aimee.id },
          ],
        },
      })

      await updateBooking({
        id: b1.id,
        input: {
          date: new Date('2023-10-19T20:08:11.000Z'),
          jubenId: scenario.booking.one.jubenId,
          timeSlotId: scenario.booking.one.timeSlotId,
          total: 5,
          male: 4,
          female: 1,
          users: [
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
            { id: scenario.user.bob.id },
          ],
        },
      })

      const drives = await jubenDrives()
      const drive1 = drives.filter((drive) => {
        return drive.bookings.some((b) => {
          return b.id === b2.id
        })
      })[0]
      const drive2 = drives.filter((drive) => {
        return drive.bookings.some((b) => {
          return b.id === b1.id
        })
      })[0]

      expect(drive1.total).toEqual(5)
      expect(drive2.total).toEqual(10)
      expect(drive1.bookings.length).toEqual(1)
      expect(drive2.bookings.length).toEqual(2)
      expect(drive1.status).toEqual('Carpooling')
      expect(drive2.status).toEqual('Locked')
    }
  )
})
