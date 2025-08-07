 
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../../utils/axios';

// export const fetchPosts = createAsyncThunk(
//   'posts/fetchPosts',
//   async (page, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`/posts?page=${page}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'API Error');
//     }
//   }
// );

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: {
//     items: [],
//     currentPage: 1,
//     lastPage: null,
//     hasMore: true,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     resetPosts(state) {
//       state.items = [];
//       state.currentPage = 1;
//       state.lastPage = null;
//       state.hasMore = true;
//       state.loading = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         const { data, current_page, last_page, has_more } = action.payload;

//         state.items = [...state.items, ...data];
//         state.currentPage = current_page + 1;
//         state.lastPage = last_page;
//         state.hasMore = has_more;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { resetPosts } = postsSlice.actions;
// export default postsSlice.reducer;
