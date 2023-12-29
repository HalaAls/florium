import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import useOrdersState from '../../../hooks/useOrdersState'
import useUsersState from '../../../hooks/useUsersState'
import { fetchOrders } from '../../../redux/slices/orderSlice'
import { AppDispatch } from '../../../redux/store'
import UserSidebar from './UserSidebar'

const UserOrders = () => {
  const { orders, isLoading, error } = useOrdersState()
  const { userData } = useUsersState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  return (
    <div className="section">
      <UserSidebar />
      <div className="user-dashboard-container">
        <div>
          <h2>User Orders here</h2>
        </div>

        <div className="user-container">
          {orders.length > 0 &&
            orders.map((order) => {
              if (String(order.userId) === userData?._id) {
                return (
                  <div className="user-card" key={order.id}>
                    <div className="user__details">
                      <p>Product ID: {order.productId}</p>
                      <p>Order Date: {order.purchasedAt}</p>
                      <p>Order ID: {order.id}</p>
                      <p>User ID: {order.userId}</p>
                    </div>
                    {/* <div className="order__controls">
                      <button>Delete</button>
                      <button>Edit</button>
                    </div> */}
                  </div>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}

export default UserOrders
