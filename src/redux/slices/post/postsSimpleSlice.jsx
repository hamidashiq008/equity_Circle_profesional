// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from '../../../utils/axios';

// export const fetchPosts = createAsyncThunk(
//     'posts', async (_, { rejectWithValue }) => {

//         try {
//             const fetchPostsApi = await axios.get('/posts');
//             return fetchPostsApi.data.data;
//         } catch (error) {
//             return rejectWithValue('Api Error')
//         }
//     }
// )
// export const postsSimpleSlice = createSlice({
//     name: 'postsSimple',
//     initialState: {
//         isLoading: false,
//         posts: [],
//         error: null,

//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPosts.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchPosts.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.posts = action.payload;
//                 state.error = null;
//             })
//             .addCase(fetchPosts.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//             })
//     }
// })

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = postsSimpleSlice.actions

// export default postsSimpleSlice.reducer