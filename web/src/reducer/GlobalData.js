let refsToScroll = []

export const setRefsToScroll = (refs) => {
  refsToScroll = refs
}

export const getRefToScrollByIndex = (i) => {
  return refsToScroll[i]
}
