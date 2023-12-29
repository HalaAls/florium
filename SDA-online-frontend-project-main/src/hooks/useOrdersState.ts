import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useOrdersState = () => {
  const { orders, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.ordersReducer
  )
  return { orders, isLoading, error, searchTerm }
}

export default useOrdersState
