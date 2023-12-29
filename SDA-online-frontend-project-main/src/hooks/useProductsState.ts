import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useProductsState = () => {
  const { products, error, isLoading, singleProduct, searchTerm, isSuccess, pagination, sort } =
    useSelector((state: RootState) => state.productsReducer)
  return { products, error, isLoading, singleProduct, searchTerm, isSuccess, pagination, sort }
}

export default useProductsState
