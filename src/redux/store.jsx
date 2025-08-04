import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/auth/registerSlice';
import loginReducer from './slices/auth/loginSlice';
import userDetailReducer  from './slices/user/userDetailSlice';

export const store = configureStore({

  reducer: {
    register: registerReducer,
    login: loginReducer,
    userDetail: userDetailReducer ,


  },

});
