import BookingButton from './BookingButton'
import { standard } from './BookingButton.mock'

export default {
  title: 'UI/BookingButton',
  component: BookingButton,
  argTypes: {
    isFull: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
}

const data = standard().one
export const Basic = ({ isFull, notAvailable }) => {
  if (isFull) {
    data.male = 3
    data.female = 2
    data.players = '3|2'
  } else {
    data.male = 3
    data.female = 2
    data.players = '3|3'
  }
  data.notAvailable = notAvailable
  return <BookingButton {...data} />
}

Basic.args = {
  isFull: false,
  notAvailable: true,
}
