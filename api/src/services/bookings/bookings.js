import { ServiceValidationError, validate, validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { createDrive, updateDrive } from '../jubenDrives/jubenDrives'

export const bookings = () => {
  return db.booking.findMany({
    include: {
      users: true,
    },
  })
}

export const booking = ({ id }) => {
  return db.booking.findUnique({
    where: { id },
    include: {
      users: true,
      juben: true,
      timeSlot: true,
    },
  })
}

export const createBooking = async ({ input }) => {
  validate(new Date(input.date).getTime(), 'date', {
    numericality: {
      greaterThan: new Date().getTime(),
      message: '预定时间不能是过去',
    },
  })
  validateWith(() => {
    if (
      !input.total ||
      (!input.male && !input.female) ||
      input.male + input.female != input.total ||
      input.total != input.users.length
    ) {
      throw new ServiceValidationError('请提供正确人数信息')
    }
  })
  return await db.$transaction(async (db) => {
    if (!(await jubenIsAvailable(db, input))) {
      throw new ServiceValidationError('剧本还在内测中，敬请期待。')
    } else if (await bookingIsMade(db, input)) {
      throw new ServiceValidationError(
        '你已经预订了相同的剧本，如需调整请前往我的剧本。'
      )
    } else if (await bookingIsFull(db, input)) {
      throw new ServiceValidationError('本剧本预定已满，请修改时间或者人数。')
    } else {
      const b = await db.booking.create({
        data: {
          date: input.date,
          male: input.male,
          female: input.female,
          total: input.total,
          jubenId: input.jubenId,
          timeSlotId: input.timeSlotId,
          status: input.status,
          users: {
            connect: input.users,
          },
        },
        include: {
          users: true,
        },
      })
      await createDrive(b, db)
      return db.booking.findUnique({
        where: { id: b.id },
        include: {
          users: true,
          juben: true,
        },
      })
    }
  })
}

export const updateBooking = async ({ id, input }) => {
  validate(new Date(input.date).getTime(), 'date', {
    numericality: {
      greaterThan: new Date().getTime(),
      message: '预定时间不能是过去',
    },
  })
  validateWith(() => {
    if (
      !input.total ||
      (!input.male && !input.female) ||
      input.male + input.female != input.total ||
      input.total != input.users.length
    ) {
      throw '请提供正确人数信息'
    }
  })
  return await db.$transaction(async (db) => {
    if (!(await jubenIsAvailable(db, input))) {
      throw new ServiceValidationError('剧本还在内测中，敬请期待。')
    } else if (await bookingIsFull(db, input, id)) {
      throw new ServiceValidationError('本剧本预定人数超过限制，请修改人数。')
    } else {
      await db.booking.update({
        where: { id },
        data: {
          users: {
            set: [],
          },
        },
      })
      const booking = await db.booking.update({
        data: {
          date: input.date,
          male: input.male,
          female: input.female,
          total: input.total,
          jubenId: input.jubenId,
          timeSlotId: input.timeSlotId,
          status: input.status,
          users: {
            connect: input.users,
          },
        },
        where: { id },
        include: {
          users: true,
        },
      })
      await updateDrive(booking, db)
      return booking
    }
  })
}

export const deleteBooking = ({ id }) => {
  return db.booking.delete({
    where: { id },
  })
}

const jubenIsAvailable = async (db, input) => {
  const juben = await db.juben.findUnique({
    where: {
      id: input.jubenId,
    },
  })
  return juben.available
}

const bookingIsMade = async (db, input) => {
  const first = await db.booking.findFirst({
    where: {
      jubenId: input.jubenId,
      timeSlotId: input.timeSlotId,
      users: {
        some: {
          id: {
            in: input.users?.map((u) => {
              return u['id']
            }),
          },
        },
      },
    },
  })
  return first
}

const bookingIsFull = async (db, input, id) => {
  var totalInDiff = input.total
  if (id) {
    const updatingBooking = await db.booking.findUnique({ where: { id: id } })
    totalInDiff = input.total - updatingBooking.total
  }
  const bookingSum = await db.booking.aggregate({
    _sum: {
      total: true,
    },
    where: {
      jubenId: input.jubenId,
      date: input.date,
      timeSlotId: input.timeSlotId,
    },
  })
  const before = bookingSum._sum.total || 0
  const juben = await db.juben.findUnique({
    where: {
      id: input.jubenId,
    },
  })
  const playersCount =
    parseInt(juben.players.split('|')[0]) +
    parseInt(juben.players.split('|')[1])
  if (parseInt(playersCount) - parseInt(before) >= parseInt(totalInDiff)) {
    return false
  } else {
    return true
  }
}

export const Booking = {
  juben: (_obj, { root }) =>
    db.booking.findUnique({ where: { id: root.id } }).juben(),
  timeSlot: (_obj, { root }) =>
    db.booking.findUnique({ where: { id: root.id } }).timeSlot(),
  users: (_obj, { root }) =>
    db.booking.findUnique({ where: { id: root.id } }).users(),
}
