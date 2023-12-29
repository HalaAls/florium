import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'

export type User = {
  _id: string
  name: string
  email: string
  password: string
  image: string
  isAdmin: boolean
  isBanned: boolean
  address: string
  phone: string
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get<User[]>('/api/users')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch users')
  }
})

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.delete<User[]>(`/api/users/${email}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const banUser = createAsyncThunk(
  'users/banUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/users/ban/${email}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const unbanUser = createAsyncThunk(
  'users/unbanUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/users/unban/${email}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/auth/login`, user)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  try {
    const response = await api.post(`/api/auth/logout`)
    return response.data
  } catch (error) {
    throw new Error('Failed to logout user')
  }
})

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (newUser: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/process-register`, newUser, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/process-register`, newUser, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
export const updateUser = createAsyncThunk(
  'users/udateUser',
  async (arg: { userEmail: string; updatedUser: FormData }, { rejectWithValue }) => {
    try {
      const { userEmail, updatedUser } = arg
      const response = await api.put(`/api/users/${userEmail}`, updatedUser)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const grantRole = createAsyncThunk(
  'users/grantRole',
  async (grantedUser: object, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/users/grant-role`, grantedUser)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const forgetPassword = createAsyncThunk(
  'users/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/forget-password`, { email })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (resetData: object, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/users/reset-password`, {
        password: resetData.password,
        token: resetData.token
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
// done with the above ones

export const activateUsersAccount = async (token: string) => {
  try {
    const response = await api.post(`/api/users/activate`, { token })
    console.log(response.data)
    return response.data.message
  } catch (error) {
    throw new Error('Failed to activate user account')
  }
}

const storageData =
  localStorage.getItem('signinData') !== null
    ? JSON.parse(String(localStorage.getItem('signinData')))
    : []

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLogin: boolean
  userData: null | User
  searchTerm: string
  ban: boolean
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLogin: storageData.isLoggedin,
  userData: storageData.userData,
  searchTerm: '',
  ban: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.isLogin = true
      state.userData = action.payload
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isLoggedin: state.isLogin,
          userData: state.userData
        })
      )
    },
    signout: (state) => {
      state.isLogin = false
      state.userData = null
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isLoggedin: state.isLogin,
          userData: state.userData
        })
      )
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.error = null
      state.users = action.payload.payload.users
      state.isLoading = false
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      // state.users = action.payload.payload.users
      console.log('second', action.payload.message)
      state.users = action.payload.message
      state.isLoading = false
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { email } = action.payload.payload
      state.users = state.users.filter((user) => user.email !== email)
      state.isLoading = false
    })

    builder.addCase(banUser.fulfilled, (state, action) => {
      const { email } = action.payload.payload
      const foundUser = state.users.find((user) => user.email === email)
      if (foundUser) {
        foundUser.isBanned = true
      }
      state.isLoading = false
    })

    builder.addCase(unbanUser.fulfilled, (state, action) => {
      const { email } = action.payload.payload
      const foundUser = state.users.find((user) => user.email === email)
      if (foundUser) {
        foundUser.isBanned = false
      }
      state.isLoading = false
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogin = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isLoggedin: state.isLogin,
          userData: state.userData
        })
      )
      state.isLoading = false
    })

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLogin = false
      state.userData = null
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isLoggedin: state.isLogin,
          userData: state.userData
        })
      )
      state.isLoading = false
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log('action.payload', action.payload.payload)
      const { name, phone, address, image, email } = action.payload.payload
      if (state.userData) {
        state.userData.name = name
        state.userData.phone = phone
        state.userData.address = address
        state.userData.address = address
        state.userData.image = image
        state.userData.email = email
        localStorage.setItem(
          'signinData',
          JSON.stringify({
            isLoggedin: state.isLogin,
            userData: state.userData
          })
        )
        state.isLoading = false
      }
    })
    builder.addCase(grantRole.fulfilled, (state, action) => {
      const { email, isAdmin } = action.payload.payload
      const foundUser = state.users.find((user) => user.email === email)
      if (foundUser) {
        foundUser.isAdmin = isAdmin
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

export const { clearError, searchUser } = userSlice.actions
export default userSlice.reducer
