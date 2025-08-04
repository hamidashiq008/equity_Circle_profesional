import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('email', userData.email);
            formData.append('password', userData.password);

            const response = await axios.post(
                'https://equity-api.techtrack.online/api/login',
                formData
            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'UnKnown Error');
        }
    }
);
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        user: null,
        token: null,
        error: null,
        successMsg: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMsg = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMsg = 'User SuccessFully Added';
                state.token = action.payload.access_token || null;
                state.user = action.payload.user || null;
                localStorage.setItem('token', action.payload.access_token); // Optional
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Login failed';
            })
    }
})


export default loginSlice.reducer