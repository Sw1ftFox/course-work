import Button from '@ui/Button';
import type { Habit } from '../types';
import ProgressBar from '@ramonak/react-progress-bar';
import { updateHabitThunk } from '../habitsSlice';
import HabitCalendar from './HabitCalendar';
import { useNavigate } from 'react-router-dom';
import { getCalendarDays } from '@utils/getCalendarDays';
import { useAppDispatch } from '@app/hooks';
import styles from '@styles/habitItem.module.css';

interface Props {
  habit: Habit;
}

function HabitItem({ habit }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const percent = Math.floor((habit.currentCount / habit.targetCount) * 100);

  const handleNavigate = () => {
    navigate(`/habits/${habit.id}`, {
      state: { habit },
    });
  };

  const handleMark = async () => {
    const today = new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (!habit.completedDates.some(date => date === today)) {
      await dispatch(
        updateHabitThunk({
          habitId: habit.id,
          newData: {
            ...habit,
            currentCount: habit.currentCount + 1,
            completedDates: [...habit.completedDates, today],
          },
        }),
      );
    }
  };

  return (
    <div className={styles.habit}>
      <div className={styles.habit__title} tabIndex={0} onClick={handleNavigate}>
        {habit.title}
      </div>
      <div>
        <div className={`${styles.habit__calendar} ${styles.calendar}`}>
          <div className={styles.calendar__title}>Мини-календарь</div>
          <div className={styles.calendar__content}>
            <HabitCalendar
              completedDates={habit.completedDates}
              calendarDays={getCalendarDays('week')}
            />
          </div>
        </div>

        <div className={styles.habit__actions}>
          <div className={`${styles.habit__progress} ${styles.progress}`}>
            <div className={styles.progress__title}>Прогресс</div>
            <ProgressBar
              completed={percent}
              bgColor="#3e2723"
              baseBgColor="#e9e0d6"
              height="6px"
              isLabelVisible={false}
            />
          </div>
          <Button
            text="Отметить сегодня"
            className={styles.habit__button}
            onClick={() => handleMark()}
          />
        </div>
      </div>
    </div>
  );
}

export default HabitItem;
