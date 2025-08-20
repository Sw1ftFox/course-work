import { useEffect, useState } from 'react';
import type { Habit } from '../types';
import styles from '@styles/habitStreak.module.css';

const HabitStreak = ({ habit }: { habit: Habit }) => {
  const dates = habit.completedDates;
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const sortedDates = dates
      .map(dateStr => {
        const [day, month, year] = dateStr.split('.').map(Number);
        return new Date(year, month - 1, day);
      })
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;

    for (let i = 0; i < sortedDates.length - 1; i++) {
      const currentDate = sortedDates[i];
      const nextDate = sortedDates[i + 1];

      const diffInDays = Math.floor(
        (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffInDays === 1) {
        streak++;
      } else if (diffInDays > 1) {
        break;
      }
    }

    setCurrentStreak(sortedDates.length > 0 ? streak + 1 : 0);
  }, [dates]);

  const getStreakMessage = () => {
    if (currentStreak >= 30) return '🔥 Невероятная дисциплина! 30 дней подряд!';
    if (currentStreak >= 7) return '🎉 Отлично! Так держать!';
    if (currentStreak >= 3) return '👍 Хорошее начало!';
    return 'Продолжайте! Завтра будет новый день!';
  };

  return (
    <div className={styles.tracker}>
      <h3 className={styles.tracker__title}>
        Текущая серия: <span>{currentStreak}</span> дней
      </h3>
      <div className={styles.tracker__message}>{getStreakMessage()}</div>
      <div className={styles.tracker__levels}>
        <div className={`${styles.tracker__level} ${currentStreak >= 3 ? styles.active : ''}`}>
          3 дня
        </div>
        <div className={`${styles.tracker__level} ${currentStreak >= 7 ? styles.active : ''}`}>
          7 дней
        </div>
        <div className={`${styles.tracker__level} ${currentStreak >= 30 ? styles.active : ''}`}>
          30 дней
        </div>
      </div>
    </div>
  );
};

export default HabitStreak;
