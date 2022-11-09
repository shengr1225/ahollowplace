import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Star = (props) => {
  return (
    <div className="relative" key={props.index}>
      <div
        className={'overflow-hidden absolute'}
        style={{
          width: `${(props.activeState % 1) * 100}%`,
        }}
      >
        <AiFillStar />
      </div>
      <div>{props.showEmptyIcon ? <AiOutlineStar /> : <AiFillStar />}</div>
    </div>
  )
}

const StarRating = (props) => {
  const totalStars = props.totalStars
  const activeStars = props.value
  const starArray = [...new Array(totalStars)]
  return (
    <div className="flex self-center">
      {starArray.map((arr, index) => {
        var activeState = activeStars
        const showEmptyIcon = activeState === -1 || activeState < index + 1
        if (activeState < index) {
          activeState = 0
        }
        return (
          <Star
            key={index}
            activeState={activeState}
            showEmptyIcon={showEmptyIcon}
          />
        )
      })}
    </div>
  )
}

export default StarRating
