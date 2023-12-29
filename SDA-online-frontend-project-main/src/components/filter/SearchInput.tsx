import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { searchProduct } from '../../redux/slices/productSlice'
import { AppDispatch } from '../../redux/store'

const SearchInput = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    dispatch(searchProduct(eventValue))
  }
  return (
    <input
      type="text"
      placeholder="Enter Name Here"
      name="eventValue"
      onChange={handleSearch}
      className="search-input"
    />
  )
}

export default SearchInput
