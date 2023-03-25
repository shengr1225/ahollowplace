import { getOneMonthLaterFromNow } from 'src/lib/dateUtil'
import { user } from 'src/services/users/users'

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

  scenario('creates a juben', async (scenario) => {
    const result = await createJuben({
      input: {
        name: 'String',
        image: 'String',
        desc: 'String',
        section: 'String',
        sections: 'String',
        players: 'String',
        timeSlots: [{ id: scenario.timeSlot.one.id }],
      },
    })

    expect(result.name).toEqual('String')
    expect(result.image).toEqual('String')
    expect(result.desc).toEqual('String')
    expect(result.section).toEqual('String')
    expect(result.sections).toEqual('String')
    expect(result.players).toEqual('String')
    expect(result.timeSlots.length).toBe(1)
  })

  scenario('updates a juben', async (scenario) => {
    const original = await juben({ id: scenario.juben.one.id })
    const result = await updateJuben({
      id: original.id,
      input: {
        name: 'String2',
        mvps: [{ id: scenario.user.bob.id }],
        timeSlots: [
          { id: scenario.timeSlot.one.id },
          { id: scenario.timeSlot.two.id },
        ],
      },
    })

    const u = await user({ id: scenario.user.bob.id })
    expect(u.isMVP).toBe(true)
    expect(new Date(u.MVPUntil).getDate()).toEqual(
      getOneMonthLaterFromNow().getDate()
    )
    expect(new Date(u.MVPUntil).getMonth()).toEqual(
      getOneMonthLaterFromNow().getMonth()
    )
    expect(result.timeSlots.length).toBe(2)
    expect(result.mvps.length).toBe(1)
    expect(result.name).toEqual('String2')
  })

  scenario('deletes a juben', async (scenario) => {
    const original = await deleteJuben({ id: scenario.juben.one.id })
    const result = await juben({ id: original.id })

    expect(result).toEqual(null)
  })
})
