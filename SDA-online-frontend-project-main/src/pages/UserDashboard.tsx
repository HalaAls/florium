import UserSidebar from '../components/dashboard/user-dashboard/UserSidebar'
import useUsersState from '../hooks/useUsersState'

import '/styles/user-dashboard.css'

const UserProfile = () => {
  const { userData } = useUsersState()

  return (
    <div className="user-dashboard">
      <UserSidebar />
      <div className="user-dashboard-container">
        <h2>Hey {userData?.name}!</h2>
      </div>
    </div>
  )
}

export default UserProfile
