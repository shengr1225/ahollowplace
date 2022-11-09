import { jubens, juben, createJuben, updateJuben, deleteJuben } from './jubens'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('jubens', () => {
  scenario('returns all jubens', async (scenario) => {
    const result = await jubens()

    expect(result.length).toEqual(Object.keys(scenario.juben).length)
  })

  scenario('returns a single juben', async (scenario) => {
    const result = await juben({ id: scenario.juben.one.id })

    expect(result).toEqual(scenario.juben.one)
  })

  scenario('creates a juben', async () => {
    const result = await createJuben({
      input: {
        name: 'String',
        image: 'String',
        desc: 'String',
        section: 'String',
        sections: 'String',
        players: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.image).toEqual('String')
    expect(result.desc).toEqual('String')
    expect(result.section).toEqual('String')
    expect(result.sections).toEqual('String')
    expect(result.players).toEqual('String')
  })

  scenario('updates a juben', async (scenario) => {
    const original = await juben({ id: scenario.juben.one.id })
    const result = await updateJuben({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a juben', async (scenario) => {
    const original = await deleteJuben({ id: scenario.juben.one.id })
    const result = await juben({ id: original.id })

    expect(result).toEqual(null)
  })
})
