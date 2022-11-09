export const thumbnailSize = (url) => {
  if (!url) {
    return ''
  }
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:100')
  return parts.join('/')
}

export const listSize = (url) => {
  if (!url) {
    return ''
  }
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:200')
  return parts.join('/')
}

export const highlightSize = (url) => {
  if (!url) {
    return ''
  }
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:1000')
  return parts.join('/')
}

export const normalSize = (url) => {
  const parts = url.split('/')
  parts.splice(3, 0, 'resize=width:500')
  return parts.join('/')
}
