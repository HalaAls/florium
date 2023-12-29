import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import Signin from '../components/registeration/Signin'
import { RootState } from '../redux/store'

const ProfileProtectedRoute = () => {
  const location = useLocation()
  const { isLogin } = useSelector((state: RootState) => state.usersReducer)
  return isLogin ? <Outlet /> : <Signin pathName={location.pathname} />
}

export default ProfileProtectedRoute
