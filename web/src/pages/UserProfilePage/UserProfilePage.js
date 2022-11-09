import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/StyleHeader/StyleHeader'
import UserProfileCell from 'src/components/User/UserProfileCell'

const UserProfilePage = ({ id }) => {
  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={true} />
      </div>
      <UserProfileCell id={id} />
    </>
  )
}

export default UserProfilePage
