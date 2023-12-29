import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'

//create a type for the data
export type Category = {
  _id: string
  name: string
  slug: string
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await api.get<Category[]>('/api/categories')
    return response.data.payload.categories
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
})

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (newCategory: string, { rejectWithValue }) => {
    try {
      const response = await api.post<Category[]>(`/api/categories`, { name: newCategory })
      console.log('cat response.data ', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (slug: string, { rejectWithValue }) => {
    try {
      await api.delete<Category[]>(`/api/categories/${slug}`)
      return slug
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (updatedCategory: Partial<Category>, { rejectWithValue }) => {
    try {
      const response = await api.put<Category[]>(`/api/categories/${updatedCategory.slug}`, {
        name: updatedCategory.name
      })
      return response.data.payload
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      state.searchTerm = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
      // state.categories = action.payload.payload.categories
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      console.log('cat action.payload', action.payload)
      console.log('cat action.payload.paload', action.payload.payload)

      state.categories.push(action.payload.payload)
      state.isLoading = false
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category) => category.slug !== action.payload)
      state.isLoading = false
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { _id, slug, name } = action.payload
      const foundCategory = state.categories.find((category) => category._id === _id)
      if (foundCategory && name) {
        foundCategory.name = name
        foundCategory.slug = slug
      }
      state.isLoading = false
    })
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.payload
        state.isLoading = false
      }
    )
  }
})

export const { clearError, searchCategory } = categorySlice.actions
export default categorySlice.reducer
