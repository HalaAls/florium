import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import Signin from '../components/registeration/Signin'
import { RootState } from '../redux/store'

const AdminProtectedRoute = () => {
  const location = useLocation()
  const { isLogin, userData } = useSelector((state: RootState) => state.usersReducer)
  return isLogin && userData?.isAdmin === true ? (
    <Outlet />
  ) : (
    <Signin pathName={location.pathname} />
  )
}

export default AdminProtectedRoute
