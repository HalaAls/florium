import { useDispatch } from 'react-redux'
import Routing from './routes/Routing'
import { useEffect } from 'react'

import { fetchCategories } from './redux/slices/categorySlice'
import { fetchOrders } from './redux/slices/orderSlice'
import { fetchUsers } from './redux/slices/userSlice'
import { fetchProducts } from './redux/slices/productSlice'
import { AppDispatch } from './redux/store'

import '../src/styles/app.css'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchOrders())
    dispatch(fetchUsers())
    dispatch(fetchProducts())
  }, [])
  return (
    <div className="app">
      <Routing />
    </div>
  )
}

export default App
