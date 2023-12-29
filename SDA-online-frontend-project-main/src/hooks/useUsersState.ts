import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useUsersState = () => {
  const { users, error, isLoading, isLogin, userData, searchTerm, ban } = useSelector(
    (state: RootState) => state.usersReducer
  )
  return { users, error, isLoading, isLogin, userData, searchTerm, ban }
}

export default useUsersState
