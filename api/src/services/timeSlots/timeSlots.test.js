import {
  timeSlots,
  timeSlot,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from './timeSlots'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('timeSlots', () => {
  scenario('returns all timeSlots', async (scenario) => {
    const result = await timeSlots()

    expect(result.length).toEqual(Object.keys(scenario.timeSlot).length)
  })

  scenario('returns a single timeSlot', async (scenario) => {
    const result = await timeSlot({ id: scenario.timeSlot.one.id })

    expect(result).toEqual(scenario.timeSlot.one)
  })

  scenario('creates a timeSlot', async () => {
    const result = await createTimeSlot({
      input: { start: 'String', end: 'String', last: 2893106 },
    })

    expect(result.start).toEqual('String')
    expect(result.end).toEqual('String')
    expect(result.last).toEqual(2893106)
  })

  scenario('updates a timeSlot', async (scenario) => {
    const original = await timeSlot({ id: scenario.timeSlot.one.id })
    const result = await updateTimeSlot({
      id: original.id,
      input: { start: 'String2' },
    })
    expect(result.start).toEqual('String2')
  })

  scenario('deletes a timeSlot', async (scenario) => {
    const original = await deleteTimeSlot({ id: scenario.timeSlot.one.id })
    const result = await timeSlot({ id: original.id })

    expect(result).toEqual(null)
  })
})
