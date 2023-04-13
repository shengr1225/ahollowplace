import React from 'react'
let state
export const initState = (s) => {
  state = s
}

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const listeners = new Map()

export const dispatch = (action) => {
  let i = 0
  const preValues = Array.from(listeners, ([getValue]) => getValue(state))

  state = reducer(state, action)
  listeners.forEach((setValue, getValue) => {
    const value = getValue(state)
    console.log(value, preValues[i++])
    if (value != preValues[i++]) {
      setValue(value)
    }
  })
}

export const useState = (getValue) => {
  const [value, setValue] = React.useState(getValue(state))
  React.useEffect(() => {
    listeners.set(getValue, setValue)
    return () => listeners.delete(getValue)
  }, [getValue])
  return value
}

export default reducer
