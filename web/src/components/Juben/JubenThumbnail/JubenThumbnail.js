import { trigger } from 'src/utility/event'
import { listSize } from 'src/utility/helper'

const JubenThumbnail = ({ juben }) => {
  return (
    <button
      className="flex-auto p-2 m-2 w-36 h-46 max-w-64 overflow-auto cursor-pointer"
      onClick={() => {
        trigger('juben:selected', { name: juben.name })
      }}
    >
      <div
        className="w-30 h-24"
        style={{
          backgroundImage: 'url(' + listSize(juben?.image) + ')',
          backgroundSize: '100%',
        }}
      ></div>
      <p className="text-xs mt-1">{juben.name}</p>
      <p className="text-xs text-gray-500">
        {juben?.sections?.replace('，', ' ')}
      </p>
    </button>
  )
}

export default JubenThumbnail
