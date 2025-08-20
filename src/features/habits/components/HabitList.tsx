import HabitItem from './HabitItem';
import { fetchHabitsThunk, selectHabits, selectHabitsLoading } from '../habitsSlice';
import { useEffect } from 'react';
import Spinner from '@ui/Spinner';
import { selectCurrentUser } from '@auth/authSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import styles from '@styles/habitsList.module.css';

function HabitList() {
  const dispatch = useAppDispatch();
  const habits = useAppSelector(selectHabits);
  const loading = useAppSelector(selectHabitsLoading);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchHabitsThunk(user.uid));
    }
  }, [dispatch, user]);

  return (
    <div className={styles.habits}>
      {loading ? <Spinner /> : habits.map(habit => <HabitItem key={habit.id} habit={habit} />)}
    </div>
  );
}

export default HabitList;
