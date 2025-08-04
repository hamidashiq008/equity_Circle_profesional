
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect } from 'react';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    const userToken = localStorage.getItem('token');
    console.log('✅ token from localStorage:', userToken);

    try {
      const response = await axios.get('https://equity-api.techtrack.online/api/user', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log('✅ user response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ fetchUser error:', error.response);
      return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
  }
);


const userDetailSlice = createSlice({

  name: 'userDetail',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = userDetailSlice.actions;
export default userDetailSlice.reducer;
