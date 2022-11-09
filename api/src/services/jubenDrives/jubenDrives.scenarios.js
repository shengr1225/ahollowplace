export const standard = defineScenario({
  user: {
    bob: {
      data: {
        name: 'Bob',
        email: 'Bob@gmail.com',
        roles: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    alice: {
      data: {
        name: 'Alice',
        email: 'Alice@gmail.com',
        roles: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
  booking: {
    one: {
      data: {
        date: '2022-10-16T20:08:11Z',
        total: 5,
        male: 4,
        female: 1,
        note: 'String',
        status: 'Carpooling',
        juben: {
          create: {
            name: 'String',
            image: 'String',
            desc: 'String',
            section: 'String',
            players: '5|5',
            sections: 'String',
          },
        },
        timeSlot: { create: { start: 'String', end: 'String', last: 5699203 } },
      },
    },
  },
})
