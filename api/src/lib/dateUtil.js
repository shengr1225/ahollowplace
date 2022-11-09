import Moment from 'moment'
import { extendMoment } from 'moment-range'

export const formatDate = (date) => {
  const dateStr = date.toLocaleString('zh-CH')
  return dateStr
}

export const newDate = (date) => {
  const dateObj = new Date(date)
  dateObj.setUTCHours(0, 0, 0, 0)
  return dateObj
}

export const dateOnly = (date) => {
  const dateObj = new Moment(date)
  return dateObj.format('MMM DD')
}

const showHoursIn24 = (t) => {
  return t.includes('AM')
    ? parseInt(t.replace('AM', ''))
    : parseInt(t.replace('PM', '')) + 12
}

export const timeSlotConflit = (t1, t2) => {
  const moment = extendMoment(Moment)
  const start1 = showHoursIn24(t1.start)
  const end1 = showHoursIn24(t1.end)
  const start2 = showHoursIn24(t2.start)
  const end2 = showHoursIn24(t2.end)

  const s1 = moment.hour(start1)
  const e1 = moment.hour(end1)
  const s2 = moment.hour(start2)
  const e2 = moment.hour(end2)

  const range1 = moment.range(s1, e1)
  const range2 = moment.range(s2, e2)

  return range1.overlaps(range2)
}
