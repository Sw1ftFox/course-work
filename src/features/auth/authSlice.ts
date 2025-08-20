import type { RootState } from '@app/store';
import { login, loginWithGoogle, register } from '@services/auth';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, User } from './types';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await register(credentials.email, credentials.password);
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await login(credentials.email, credentials.password);
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUserWithGoogle = createAsyncThunk(
  'auth/google-login',
  async (_, { rejectWithValue }) => {
    try {
      const user = await loginWithGoogle();
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        action => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        },
      )
      .addMatcher(
        action =>
          [
            registerUser.fulfilled.type,
            loginUser.fulfilled.type,
            loginUserWithGoogle.fulfilled.type,
          ].includes(action.type),
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(state.user));
        },
      );
  },
});

export const { setUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
