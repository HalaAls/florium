import { useDispatch } from 'react-redux'

import { baseURL } from '../api'
import Payment from '../components/cart/Payment'
import useCartState from '../hooks/useCartState'
import useUsersState from '../hooks/useUsersState'
import { deleteFromCart, resetCart, updateCartItemQuantity } from '../redux/slices/cartSlice'
import { AppDispatch } from '../redux/store'

import { TiDeleteOutline } from 'react-icons/ti'
import '/styles/cart.css'

const Cart = () => {
  const dispatch: AppDispatch = useDispatch()
  const { cartItems } = useCartState()
  const { isLogin } = useUsersState()

  const handleDeleteFromCart = (itemId: string) => {
    dispatch(deleteFromCart(itemId))
  }
  const handleCartReset = () => {
    dispatch(resetCart())
  }

  const totalPayment = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ itemId, newQuantity }))
    }
  }

  return (
    <div className="cart-section">
      <div className="cart-header">
        <h2>
          {cartItems.length > 0 ? 'Total Cart Items: ' + cartItems.length : 'Your Cart is Empty'}
        </h2>
        {cartItems.length > 0 && (
          <h2>
            <button className="reset-button" onClick={handleCartReset}>
              <TiDeleteOutline />
            </button>
          </h2>
        )}
      </div>
      <div className="cart-container">
        {cartItems.length > 0 && (
          <>
            <div className="cart-details">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-product">
                  <div className="cart-product-info">
                    <div className="cart-product-image">
                      <img src={`${baseURL}/${item.image}`} alt={item.name} />
                    </div>
                    <div className="cart-product-content">
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>Size: {item.size}</p>
                      <div className="choose">
                        <p>Quantity </p>
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-controls">
                    <button onClick={() => handleDeleteFromCart(item._id)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-payment">
              <div className="cart-payment-details">
                <h2>Payment</h2>
                <p>Total Amount: ${totalPayment()}</p>
              </div>
              {cartItems.length > 0 && isLogin ? (
                <Payment cartItems={cartItems} amount={totalPayment()} />
              ) : (
                'Please Sign in To Continue'
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Cart
