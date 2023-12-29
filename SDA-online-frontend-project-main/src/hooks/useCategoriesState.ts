import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useCategoriesState = () => {
  const { categories, error, isLoading, searchTerm } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  return { categories, error, isLoading, searchTerm }
}

export default useCategoriesState
