import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import { Category } from './categorySlice'

export type Product = {
  _id: string
  name: string
  slug: string
  image: string
  description: string
  category: Category
  variant: string[]
  size: string[]
  price: number
  sold: number
  quantity: number
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (arg?: {
    page: number
    limit: number
    category: string[]
    priceRange: number[]
    sort: string
    searchTerm: string
  }) => {
    try {
      if (!arg) {
        //  when no arguments are provided (optional)
        const response = await api.get('/api/products')
        return response.data
      }
      const { page, limit, category, priceRange, sort, searchTerm } = arg
      const min = priceRange[0]
      const max = priceRange[1]

      const response = await api.get(
        `/api/products?page=${page}&limit=${limit}&category=${category}&minPrice=${min}&maxPrice=${max}&sort=${sort}&search=${searchTerm}`
      )
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch products')
    }
  }
)

export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${slug}`)
      console.log('response here is :', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/products`, newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('slice response.data,', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/products/${slug}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (arg: { slug: string; updatedProduct: FormData }, { rejectWithValue }) => {
    try {
      const { slug, updatedProduct } = arg
      const response = await api.put(`/api/products/${slug}`, updatedProduct)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  isSuccess: boolean // this state will be used to fetch the category te the product when t succesful
  singleProduct: Product | null
  searchTerm: string
  sort: string
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
  }
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  isSuccess: false, // this state to update the product when the update is succesful
  singleProduct: null,
  searchTerm: '',
  sort: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  }
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      state.sort = action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product._id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const { totalProducts, totalPages, currentPage } = action.payload.payload.pagination
      state.pagination = {
        totalPages: totalPages,
        currentPage: currentPage,
        totalProducts: totalProducts
      }
      state.products = action.payload.payload.products
      state.isLoading = false
    })
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload.payload
      state.isLoading = false
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload.payload)
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const slug = action.payload.payload.slug
      const filteredProducts = state.products.filter((product) => product.slug !== slug)
      state.products = filteredProducts
      state.isLoading = false
    })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const { _id, slug, name, description, category, image, price, quantity, size, variant } =
        action.payload.payload
      const foundProduct = state.products.find((product) => product._id === _id)
      if (foundProduct && name) {
        foundProduct.name = name
        foundProduct.slug = slug
        foundProduct.description = description
        foundProduct.category._id = category
        foundProduct.image = image
        foundProduct.price = price
        foundProduct.quantity = quantity
        foundProduct.size = size
        foundProduct.variant = variant
      }
      state.isLoading = false
      state.isSuccess = true
    })

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
        state.isSuccess = false
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.payload
        state.isLoading = false
        state.isSuccess = false
      }
    )
  }
})

export const { sortProducts, searchProduct, findProductById, addProduct } = productSlice.actions
export default productSlice.reducer
