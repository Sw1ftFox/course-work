import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchHabits, addHabit, updateHabit, deleteHabit } from '@services/habitsApi';
import type { Habit, HabitsState } from './types';
import type { RootState } from '@app/store';

const initialState: HabitsState = {
  habits: [],
  loading: false,
  error: null,
};

export const fetchHabitsThunk = createAsyncThunk(
  'habits/fetchAll',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchHabits(userId);
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const addHabitThunk = createAsyncThunk(
  'habits/add',
  async (
    habitData: {
      title: string;
      userId: string;
      targetCount: number;
      currentCount: number;
      completedDates: string[];
      description: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await addHabit(habitData);
      return habitData;
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateHabitThunk = createAsyncThunk(
  'habits/update',
  async (
    { habitId, newData }: { habitId: string; newData: Partial<Habit> },
    { rejectWithValue },
  ) => {
    try {
      await updateHabit(habitId, newData);
      return { habitId, newData };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteHabitThunk = createAsyncThunk(
  'habits/delete',
  async (habitId: string, { rejectWithValue }) => {
    try {
      await deleteHabit(habitId);
      return habitId;
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    clearHabits: state => {
      state.habits = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHabitsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabitsThunk.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.habits = action.payload;
        state.loading = false;
      })
      .addCase(fetchHabitsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addHabitThunk.fulfilled, (state, action) => {
        state.habits.push({
          id: Date.now().toString(),
          ...action.payload,
        });
      })
      .addCase(updateHabitThunk.fulfilled, (state, action) => {
        const { habitId, newData } = action.payload;
        const habitIndex = state.habits.findIndex(h => h.id === habitId);
        if (habitIndex !== -1) {
          state.habits[habitIndex] = {
            ...state.habits[habitIndex],
            ...newData,
          };
        }
      })
      .addCase(deleteHabitThunk.fulfilled, (state, action) => {
        state.habits = state.habits.filter(h => h.id !== action.payload);
      });
  },
});

export const selectHabits = (state: RootState) => state.habits.habits;
export const selectHabitsLoading = (state: RootState) => state.habits.loading;
export const selectHabitsError = (state: RootState) => state.habits.error;

export const { clearHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
