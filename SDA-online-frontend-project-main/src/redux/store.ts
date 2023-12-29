import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/productSlice'
import categoriesReducer from './slices/categorySlice'
import usersReducer from './slices/userSlice'
import ordersReducer from './slices/orderSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    categoriesReducer: categoriesReducer,
    usersReducer: usersReducer,
    ordersReducer: ordersReducer,
    cartReducer: cartReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
