import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '@styles/habitCalendar.module.css';

function HabitCalendar({
  completedDates,
  calendarDays,
}: {
  completedDates: string[];
  calendarDays: Date[];
}) {
  return (
    <div className={styles.calendar}>
      {calendarDays.map(day => {
        const dayStr = format(day, 'dd.MM.yyyy');
        const isCompleted = completedDates.includes(dayStr);

        return (
          <div
            key={dayStr}
            className={`${styles.day} ${isToday(day) ? styles.today : ''} ${isCompleted ? styles.completed : ''}`}
          >
            <div>{format(day, 'EEEEEE', { locale: ru })}</div>
            <div>{format(day, 'd')}</div>
          </div>
        );
      })}
    </div>
  );
}

export default HabitCalendar;
