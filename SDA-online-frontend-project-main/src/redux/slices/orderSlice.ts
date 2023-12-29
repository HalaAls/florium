import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await api.get('/api/orders')
    console.log('order data are :', response.data.payload)
    return response.data.payload
  } catch (error) {
    console.log(error)
  }
})

export const fetchBraintreeToken = createAsyncThunk('orders/fetchBraintreeToken', async () => {
  try {
    const response = await api.get('/api/orders/braintree/token')
    return response.data
  } catch (error) {
    console.log(error)
  }
})
export const payWithBraintree = createAsyncThunk(
  'orders/payWithBraintree',
  async (data: object) => {
    try {
      const response = await api.post('/api/orders/braintree/payment', data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export type Order = {
  _id: string
  products: {
    product: string[]
  }
  payment: object
  buyer: string
  status: string
}

export type OrderState = {
  orders: Order[]
  isLoading: boolean
  error: null | string
  searchTerm: string
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
  searchTerm: ''
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchOrder: (state, action) => {
      state.searchTerm = action.payload
    }
    // deleteOrder: (state, action) => {
    //   const filteredOrders = state.orders.filter((order) => order.id !== action.payload)
    //   state.orders = filteredOrders
    // }
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'There is an Error'
      state.isLoading = false
    })
  }
})

export const { searchOrder } = orderSlice.actions
export default orderSlice.reducer
