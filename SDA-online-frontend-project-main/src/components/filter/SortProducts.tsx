import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { sortProducts } from '../../redux/slices/productSlice'
import { AppDispatch } from '../../redux/store'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const eventValue = event.target.value
    dispatch(sortProducts(eventValue))
  }

  return (
    <select className="sort-options" name="sort" id="sort" onChange={handleOptionChange}>
      <option value="nameAZ" defaultValue="nameAZ">
        Name: A to Z
      </option>
      <option value="nameZA">Name: Z to A</option>
      <option value="oldest">Oldest First</option>
      <option value="newest">Newest First</option>
      <option value="priceASC">Price: Low to High</option>
      <option value="priceDESC">Price: High to Low</option>
    </select>
  )
}

export default SortProducts
