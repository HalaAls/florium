import { useDispatch } from 'react-redux'

import useOrdersState from '../../../hooks/useOrdersState'
import { AppDispatch } from '../../../redux/store'
import AdminSidebar from './AdminSidebar'

import { AiFillDelete } from 'react-icons/ai'
import '/styles/admin-dashboard.css'

const AdminOrders = () => {
  const dispatch: AppDispatch = useDispatch()
  const { orders, error, searchTerm } = useOrdersState()
  return (
    <div className="admin-section">
      <AdminSidebar />
      <div className="products-container">
        <div className="products__filters">
          <div className="new__product">
            <h2>Order</h2>
          </div>
          {/* <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} /> */}
        </div>
        <div className="product-container">
          <table>
            <thead>
              <tr>
                <td>Order ID</td>
                <td>Buyer Email</td>
                <td>Order Status</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
          </table>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => {
              return (
                <div className="product-card" key={order._id}>
                  <div className="product__details">
                    <table>
                      <tbody>
                        <tr>
                          <td>{order._id}</td>
                          <td>{order.buyer.email}</td>
                          {/* <td>${order.payment.transaction.amount}</td> */}
                          <td>{order.status}</td>
                          <td>
                            <div className="order__controls">
                              <button
                                id="delete__button"
                                className="dashboard__buttons"
                                // onClick={() => {
                                //   handleDelete(order.id)
                                // }}
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
