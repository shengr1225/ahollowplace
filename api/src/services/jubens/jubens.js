import * as Filestack from 'filestack-js'

import { validate } from '@redwoodjs/api'

import { newDate } from 'src/lib/dateUtil'
import { db } from 'src/lib/db'

export const jubens = () => {
  return db.juben.findMany()
}

export const juben = ({ id }) => {
  return db.juben.findUnique({
    where: { id },
  })
}

export const createJuben = ({ input }) => {
  return db.juben.create({
    data: input,
  })
}

export const updateJuben = ({ id, input }) => {
  return db.juben.update({
    data: {
      name: input.name,
      score: input.score,
      image: input.image,
      desc: input.desc,
      section: input.section,
      sections: input.sections,
      players: input.players,
      canSwitchSex: input.canSwitchSex,
      duration: input.duration,
      price: input.price,
      mvps: {
        connect: input.mvps,
      },
      photos: input.photos,
      available: input.available,
    },
    where: { id },
  })
}

export const deletePhotoOfJuben = async ({ id, index }) => {
  const juben = await db.juben.findUnique({
    where: { id },
  })
  validate(juben.photos, 'photos', {
    presence: true,
  })
  validate(juben.photos.split(','), {
    length: {
      min: index + 1,
      message: '不存在该图片序列',
    },
  })
  const url = juben.photos.split(',')[index]
  const handle = url.split('/').pop()

  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const security = Filestack.getSecurity(
    {
      // We set `expiry` at `now() + 5 minutes`.
      expiry: new Date().getTime() + 5 * 60 * 1000,
      handle,
      call: ['remove'],
    },
    process.env.REDWOOD_ENV_FILESTACK_SECRET
  )

  console.log(security, url)

  await client.remove(handle, security)

  console.log('successfully delete image')

  const photos = juben.photos.split(',')
  photos.splice(index, 1)
  return db.juben.update({
    where: { id },
    data: {
      photos: photos.join(','),
    },
  })
}

export const jubensByName = ({ name }) => {
  return db.juben.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
          },
        },
        {
          sections: {
            contains: name,
          },
        },
      ],
    },
  })
}

export const searchJubens = async ({ input }) => {
  var jubens = await db.juben.findMany({
    where: {
      OR: [
        {
          name: input.name,
        },
        {
          sections: {
            contains: input.name,
          },
        },
      ],
    },
    include: {
      drives: {
        where: {
          date: newDate(input.date),
        },
      },
    },
  })
  return jubens
}

export const deleteJuben = ({ id }) => {
  return db.juben.delete({
    where: { id },
  })
}

export const Juben = {
  drives: (_obj, { root }) =>
    db.juben.findUnique({ where: { id: root.id } }).drives({
      include: {
        timeSlot: true,
      },
    }),
  timeSlots: (_obj, { root }) =>
    db.juben.findUnique({ where: { id: root.id } }).timeSlots(),
  mvps: (_obj, { root }) =>
    db.juben.findUnique({ where: { id: root.id } }).mvps(),
}
