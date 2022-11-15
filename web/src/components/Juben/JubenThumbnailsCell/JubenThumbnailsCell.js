import { MagnifyingGlass } from 'react-loader-spinner'

import JubenThumbnail from '../JubenThumbnail/JubenThumbnail'

export const QUERY = gql`
  query FindJubenThumbnails {
    jubens {
      id
      name
      score
      sections
      players
      image
    }
  }
`

export const Loading = () => (
  <div>
    <MagnifyingGlass
      width="100"
      ariaLabel="loading"
      wrapperClass="mx-auto mt-5"
    />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ jubens }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {jubens?.map((juben) => {
        return <JubenThumbnail key={juben.id} juben={juben} />
      })}
    </div>
  )
}
