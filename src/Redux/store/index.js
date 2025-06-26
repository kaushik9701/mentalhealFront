import { configureStore } from '@reduxjs/toolkit';
import userReducer, { initializeAuth } from './userSlice';

export const store = configureStore({
  reducer: { user: userReducer }
});

// Initialize auth state
store.dispatch(initializeAuth());