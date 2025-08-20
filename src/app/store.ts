import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@auth/authSlice';
import habitsSlice from '@habits/habitsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
