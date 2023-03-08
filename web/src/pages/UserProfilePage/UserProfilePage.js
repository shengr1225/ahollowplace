import { useAuth } from 'src/auth'
import { MetaTags } from '@redwoodjs/web'

import UserProfileCell from 'src/cells/user/UserProfileCell'
import StyleHeader from 'src/components/header/header'

const UserProfilePage = ({ id }) => {
  const { currentUser } = useAuth()
  const userId = id || currentUser.id
  return (
    <>
      <MetaTags title="用户资料" description="上传头像，修改描述或调整战力" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={true} />
      </div>
      <UserProfileCell id={userId} />
    </>
  )
}

export default UserProfilePage
