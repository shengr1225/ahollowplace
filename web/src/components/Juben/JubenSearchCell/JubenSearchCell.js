import { trigger } from 'src/utility/event'
import { thumbnailSize } from 'src/utility/helper'

export const QUERY = gql`
  query jubensByName($name: String!) {
    jubensByName(name: $name) {
      id
      name
      image
      sections
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ jubensByName }) => {
  return (
    <div className="w-full px-6 overflow-scroll">
      {jubensByName.map((juben) => {
        return (
          <button
            key={juben.id}
            className="flex h-15 py-2 align-baseline leading-10 max-w-md overflow-hidden whitespace-nowrap"
            onClick={() => {
              trigger('juben:selected', { name: juben.name })
            }}
          >
            <img
              alt={juben.title}
              className="flex-initial cursor-pointer w-12 h-12 rounded-md mr-3"
              src={thumbnailSize(juben?.image)}
            />
            <p className="cursor-pointer font-semibold mr-2">{juben.name}</p>
            <p className="text-gray-500 text-xs text-ellipsis overflow-hidden cursor-pointer">
              {juben.sections}
            </p>
          </button>
        )
      })}
    </div>
  )
}
