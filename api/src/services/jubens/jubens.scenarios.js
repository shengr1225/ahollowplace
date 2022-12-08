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
