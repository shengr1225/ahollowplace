import { db } from 'src/lib/db'

const levelMap = [-1, 2, 5, 9, 14, 20, 27, 35, 44, 54, 65, 77, 90, 104, 119]

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = async ({ id, input }) => {
  return await db.$transaction(async (db) => {
    input = await updateAbility(id, input, db)
    return db.user.update({
      data: {
        name: input.name,
        email: input.email,
        thumbnail: input.thumbnail,
        desc: input.desc,
        label: input.label,
        ability: { increment: input.ability },
        tuili: input.tuili,
        yanji: input.yanji,
        xiezuo: input.xiezuo,
        gaoxiao: input.gaoxiao,
        qinggan: input.qinggan,
        knot: input.know,
        currentExp: input.currentExp,
      },
      where: { id },
    })
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

const updateAbility = async (id, input, db) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  input.ability = 0
  if (
    input.hasOwnProperty('currentExp') &&
    user.currentExp != input.currentExp
  ) {
    const levels = levelMap.filter((lv) => {
      return input.currentExp >= lv && user.currentExp < lv
    })
    if (levels.length) {
      input.ability = levels.length
    }
  }
  return input
}

export const User = {
  bookings: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).bookings(),
  JubenDrive: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).JubenDrive(),
  mvpJubens: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).mvpJubens(),
}
