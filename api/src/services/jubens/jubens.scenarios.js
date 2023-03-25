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
  },
  timeSlot: {
    one: {
      data: {
        start: '5pm',
        end: '11pm',
        last: 6,
      },
    },
    two: {
      data: {
        start: '11am',
        end: '5pm',
        last: 6,
      },
    },
  },
  juben: {
    one: {
      data: {
        name: 'String',
        image: 'String',
        desc: 'String',
        section: 'String',
        sections: 'String',
        players: 'String',
      },
    },

    two: {
      data: {
        name: 'String',
        image: 'String',
        desc: 'String',
        section: 'String',
        sections: 'String',
        players: 'String',
      },
    },
  },
})
