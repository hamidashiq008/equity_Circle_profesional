import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('password_confirmation', userData.password_confirmation);

      const response = await axios.post(
        'https://equity-api.techtrack.online/api/register',
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'User successfully registered';
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errors.email || 'Registration failed';
      });
  },
});

export default registerSlice.reducer;
