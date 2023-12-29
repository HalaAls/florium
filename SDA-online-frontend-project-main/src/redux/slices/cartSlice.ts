import { createSlice } from '@reduxjs/toolkit'

import { Product } from './productSlice'

type cartState = {
  cartItems: Product[]
}

const cartData =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

const initialState: cartState = {
  cartItems: cartData
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    resetCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload
      console.log('itemId', itemId, 'newQuantity', newQuantity)
      const itemIndex = state.cartItems.findIndex((item) => item._id === itemId)
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = newQuantity
        localStorage.setItem('cart', JSON.stringify(state.cartItems))
      }
    }
  }
})
export const { addToCart, deleteFromCart, resetCart, updateCartItemQuantity } = cartSlice.actions
export default cartSlice.reducer
