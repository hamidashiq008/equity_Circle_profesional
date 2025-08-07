import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/auth/registerSlice';
import loginReducer from './slices/auth/loginSlice';
import userDetailReducer from './slices/user/userDetailSlice';
// import postsReducaer from './slices/post/postsSlice'
// import postsSimpleReducer from './slices/post/postsSimpleSlice'

export const store = configureStore({

  reducer: {
    registers: registerReducer,
    login: loginReducer,
    userDetail: userDetailReducer,
    // posts: postsReducaer,
    // postsSimple: postsSimpleReducer,

  },

});
