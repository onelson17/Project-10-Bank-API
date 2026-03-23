import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message)
      }
      return data.body.token
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error')
    }
  }
)

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message)
      }
      return data.body
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error')
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ firstName, lastName }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      })
      const data = await response.json()
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message)
      }
      return data.body
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    userProfile: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.userProfile = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userProfile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userProfile = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer