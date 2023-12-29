import AdminSidebar from '../components/dashboard/admin-dashboard/AdminSidebar'
import useUsersState from '../hooks/useUsersState'

const AdminPanel = () => {
  const { userData } = useUsersState()
  return (
    <div className="user-dashboard">
      <AdminSidebar />
      <div className="user-dashboard-containerr">
        <h2>Hey {userData?.name}!</h2>
      </div>
    </div>
  )
}

export default AdminPanel
