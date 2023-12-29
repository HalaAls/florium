import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

const useCartState = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  return { cartItems }
}

export default useCartState
