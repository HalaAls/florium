import DropIn from 'braintree-web-drop-in-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchBraintreeToken, payWithBraintree } from '../../redux/slices/orderSlice'
import { Product } from '../../redux/slices/productSlice'
import { AppDispatch } from '../../redux/store'

const Payment = ({ cartItems, amount }: { cartItems: Product[]; amount: number }) => {
  const dispatch: AppDispatch = useDispatch()

  const [braintreeClientToken, setBraintreeClientToken] = useState(null)
  const [instance, setInstance] = useState()
  const getBraintreeClientToken = async () => {
    try {
      const response = await dispatch(fetchBraintreeToken())
      const clientToken = response.payload.clientToken
      setBraintreeClientToken(clientToken)
    } catch (error) {
      console.log(error)
    }
  }
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod()
      const response = dispatch(payWithBraintree({ nonce, cartItems, amount }))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBraintreeClientToken()
  }, [])
  return (
    <div>
      {braintreeClientToken && (
        <DropIn
          options={{ authorization: braintreeClientToken }}
          onInstance={(instance) => setInstance(instance)}
        />
      )}
      <button className="payment" onClick={handlePayment}>
        Payment
      </button>
    </div>
  )
}

export default Payment
