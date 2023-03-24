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
  review: {
    one: {
      data: {
        createdAt: '2023-03-01T23:18:48.526Z',
        rateOfJuben: 3573455,
        reviewOfJuben: 'String',
        rateOfDM: 1162554,
        reviewOfDM: 'String',
        rateOfFood: 1753219,
        reviewOfFood: 'String',
        juben: {
          create: {
            name: 'String',
            image: 'String',
            desc: 'String',
            section: 'String',
            sections: 'String',
            players: 'String',
          },
        },
      },
    },
    two: {
      data: {
        createdAt: '2023-03-01T23:18:48.526Z',
        rateOfJuben: 5927953,
        reviewOfJuben: 'String',
        rateOfDM: 5690442,
        reviewOfDM: 'String',
        rateOfFood: 613702,
        reviewOfFood: 'String',
        juben: {
          create: {
            name: 'String',
            image: 'String',
            desc: 'String',
            section: 'String',
            sections: 'String',
            players: 'String',
          },
        },
      },
    },
  },
})
