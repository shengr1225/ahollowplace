import { dateOnly } from 'src/utility/dateUtil'

const PeopleInfo = ({ male, female, needed }) => {
  const peopleJoined = male + female
  const preMale = parseInt(needed.split('|')[0])
  const preFemale = parseInt(needed.split('|')[1])
  const maleNeeded =
    preFemale - female < 0
      ? preMale - male + preFemale - female
      : preMale - male < 0
      ? 0
      : preMale - male
  const femaleNeeded =
    preMale - male < 0
      ? preFemale - female + preMale - male
      : preFemale - female < 0
      ? 0
      : preFemale - female
  const totalNeeded = parseInt(maleNeeded) + parseInt(femaleNeeded)
  var info = ''
  if (totalNeeded) {
    info = (
      <span>
        {peopleJoined}={totalNeeded} ({maleNeeded}男{femaleNeeded}女)
      </span>
    )
  } else {
    info = (
      <span className="text-red-500 font-bold">{peopleJoined}人（已满）</span>
    )
  }

  return info
}

const isFull = (male, female, needed) => {
  const maleNeeded = parseInt(needed.split('|')[0]) - male
  const femaleNeeded = parseInt(needed.split('|')[1]) - female
  return !(parseInt(maleNeeded) + parseInt(femaleNeeded))
}

const BookingButton = (props) => {
  return (
    <button
      className={
        'flex-row mr-3 py-2 px-3 bg-white rounded-md mt-5 text-sm text-gray-800 cursor-pointer hover:bg-indigo-100 active:bg-indigo-100 active:ring-1 focus:bg-indigo-100 focus:ring-1 disabled:focus:outline-none disabled:active:outline-none disabled:opacity-25 disabled:cursor-not-allowed'
      }
      disabled={
        props.notAvailable || isFull(props.male, props.female, props.players)
      }
      onClick={props.onClick?.bind(this, {
        date: props.date,
        timeSlotId: props.timeSlotId,
        start: props.start,
        end: props.end,
      })}
    >
      <div>{dateOnly(props.date) + ' | ' + props.start + '-' + props.end}</div>
      <div>
        <PeopleInfo
          male={props.male}
          female={props.female}
          needed={props.players}
        />
      </div>
    </button>
  )
}

export default BookingButton
