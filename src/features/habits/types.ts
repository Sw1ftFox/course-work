export interface Habit {
  id: string;
  title: string;
  userId: string;
  targetCount: number;
  currentCount: number;
  completedDates: string[];
  description: string;
}

export interface HabitsState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}
