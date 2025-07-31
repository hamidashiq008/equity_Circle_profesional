import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/auth/registerSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});
