import { MagnifyingGlass } from 'react-loader-spinner'

import UserProfile from '../../../components/user/UserProfile'

export const QUERY = gql`
  query FindUserById($id: Int!) {
    user: user(id: $id) {
      id
      name
      email
      jubenDriveId
      thumbnail
      desc
      label
      ability
      currentExp
      tuili
      yanji
      xiezuo
      gaoxiao
      qinggan
      knot
      isMVP
      MVPUntil
      mvpJubens {
        id
      }
      reviews {
        rateOfJuben
        reviewOfJuben
        rateOfDM
        reviewOfDM
        rateOfFood
        reviewOfFood
        dm
        juben {
          id
          name
        }
      }
      bookings {
        id
        date
        male
        female
        total
        timeSlotId
        note
        status
        users {
          id
        }
        juben {
          id
          name
          image
          players
          sections
          canSwitchSex
          drives {
            male
            female
            total
            date
            timeSlotId
          }
        }
        timeSlot {
          id
          start
          end
          last
        }
      }
    }
  }
`

export const Loading = () => (
  <div>
    <MagnifyingGlass
      width="200"
      ariaLabel="loading"
      wrapperClass="mx-auto mt-5"
    />
  </div>
)

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user, refetch }) => {
  return <UserProfile user={user} refetch={refetch} />
}
