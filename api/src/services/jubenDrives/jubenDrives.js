import { db } from 'src/lib/db'

export const jubenDrives = () => {
  return db.jubenDrive.findMany({
    include: {
      bookings: true,
      timeSlot: true,
      users: true,
      juben: true,
    },
  })
}

export const activeDrives = () => {
  return db.jubenDrive.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      bookings: true,
      timeSlot: true,
      users: true,
      juben: true,
    },
    where: {
      NOT: {
        OR: [{ status: 'Cancel' }],
      },
    },
  })
}

export const jubenDrive = ({ id }) => {
  return db.jubenDrive.findUnique({
    where: { id },
    include: {
      bookings: true,
      timeSlot: true,
      users: true,
      juben: true,
    },
  })
}

export const createDrive = async (booking, db) => {
  let d = await addToDrive(booking, db)
  if (d) {
    return jubenDriveCheck(d, db)
  } else {
    d = await createNewDrive(booking, db)
    return jubenDriveCheck(d, db)
  }
}

export const updateDrive = async (booking, db) => {
  const changedDrives = await findChangedDrive(booking, db)
  console.log('booking needs to be removed from drive: ' + changedDrives.length)

  //YES, there is changed booking, so needs to be remove from the original drive.
  if (changedDrives.length) {
    await removeBookingFromDrive(changedDrives[0], booking, db)
    let d = await addToDrive(booking, db)
    if (d) {
      return jubenDriveCheck(d, db)
    } else {
      d = await createNewDrive(booking, db)
      return jubenDriveCheck(d, db)
    }
  } else {
    //NO, there is no need to remove booking from drive, so update the original drive.
    const d = await findOriginalDrive(booking, db)
    return jubenDriveCheck(d, db)
  }
}

export const updateJubenDrive = ({ id, input }) => {
  return db.jubenDrive.update({
    data: {
      date: input.date,
      male: input.male,
      female: input.female,
      total: input.total,
      status: input.status,
      jubenId: input.jubenId,
      timeSlotId: input.timeSlotId,
      bookings: {
        connect: input.bookings,
        updateMany: {
          data: {
            status: input.status,
          },
          where: {},
        },
      },
      users: {
        connect: input.users,
      },
    },
    where: { id },
  })
}

export const deleteJubenDrive = ({ id }) => {
  return db.jubenDrive.delete({
    where: { id },
  })
}

const findChangedDrive = (booking, db) => {
  return db.jubenDrive.findMany({
    where: {
      bookings: {
        some: {
          id: booking.id,
        },
      },
      OR: [
        {
          date: {
            not: booking.date,
          },
        },
        {
          jubenId: {
            not: booking.jubenId,
          },
        },
        {
          timeSlotId: {
            not: booking.timeSlotId,
          },
        },
      ],
    },
    include: {
      bookings: true,
    },
  })
}

const findOriginalDrive = (booking, db) => {
  return db.jubenDrive.findFirst({
    where: {
      bookings: {
        some: {
          id: booking.id,
        },
      },
      date: booking.date,
      jubenId: booking.jubenId,
      timeSlotId: booking.timeSlotId,
    },
    include: {
      bookings: true,
      juben: true,
    },
  })
}

const removeBookingFromDrive = async (drive, booking, db) => {
  const d = await db.jubenDrive.update({
    where: { id: drive.id },
    include: {
      juben: true,
      bookings: true,
    },
    data: {
      bookings: {
        disconnect: [{ id: booking.id }],
      },
      users: {
        disconnect: booking.users?.map((u) => {
          return { id: u.id }
        }),
      },
    },
  })
  return jubenDriveCheck(d, db)
}

const addToDrive = async (booking, db) => {
  // add a booking to a jubenDrive if has the same date, jubenId and timeSlotId,
  // while it was not in the jubenDrive
  const drives = await db.jubenDrive.findMany({
    where: {
      bookings: {
        none: {
          id: booking.id,
        },
      },
      date: booking.date,
      jubenId: booking.jubenId,
      timeSlotId: booking.timeSlotId,
    },
  })
  if (drives && drives.length) {
    const drive = await db.jubenDrive.update({
      where: { id: drives[0].id },
      include: {
        juben: true,
        bookings: true,
      },
      data: {
        bookings: {
          connect: [{ id: booking.id }],
        },
        users: {
          connect: booking.users?.map((u) => {
            return { id: u.id }
          }),
        },
      },
    })
    return drive
  } else {
    return null
  }
}

const createNewDrive = async (booking, db) => {
  //create new jubenDrive if existing fields of booking(date, jubenId, timeSlotId) not found
  const drive = await db.jubenDrive.create({
    data: {
      bookings: {
        connect: [{ id: booking.id }],
      },
      users: {
        connect: booking.users?.map((u) => {
          return { id: u.id }
        }),
      },
      date: booking.date,
      jubenId: booking.jubenId,
      timeSlotId: booking.timeSlotId,
      female: booking.female,
      male: booking.male,
      total: booking.total,
    },
    include: {
      juben: true,
      bookings: true,
    },
  })
  return drive
}

const jubenDriveCheck = (drive, db) => {
  if (!drive) {
    return null
  }
  const bookings = drive.bookings
  const male = bookings.reduce(
    (a, b) => {
      return { male: a.male + b.male }
    },
    {
      male: 0,
    }
  ).male
  const female = bookings.reduce(
    (a, b) => {
      return { female: a.female + b.female }
    },
    {
      female: 0,
    }
  ).female
  const status = getLatestStatus(drive, male + female)
  return db.jubenDrive.update({
    where: { id: drive.id },
    include: {
      bookings: true,
    },
    data: {
      status: status,
      male: male,
      female: female,
      total: male + female,
      bookings: {
        updateMany: {
          data: {
            status: status,
            jubenDriveId: drive.id,
          },
          where: {},
        },
      },
    },
  })
}

const getLatestStatus = (drive, total) => {
  const jubenTotal =
    parseInt(drive.juben.players.split('|')[0]) +
    parseInt(drive.juben.players.split('|')[1])
  const isFull = total == jubenTotal
  const isEmpty = total == 0
  const isPast = new Date().getTime() > new Date(drive.date).getTime()
  var status = 'Carpooling'
  if (isEmpty) {
    status = 'Cancel'
  } else if (isPast) {
    if (isFull) {
      status = 'Complete'
    } else {
      status = 'Cancel'
    }
  } else if (isFull) {
    status = 'Locked'
  } else {
    status = 'Carpooling'
  }
  return status
}

export const JubenDrives = {
  bookings: (_obj, { root }) =>
    db.jubenDrive.findUnique({ where: { id: root.id } }).bookings(),
  timeSlot: (_obj, { root }) =>
    db.jubenDrive.findUnique({ where: { id: root.id } }).timeSlot(),
  juben: (_obj, { root }) =>
    db.jubenDrive.findUnique({ where: { id: root.id } }).juben(),
}
