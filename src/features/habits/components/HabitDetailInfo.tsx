import ProgressBar from '@ramonak/react-progress-bar';
import type { Habit } from '../types';
import HabitCalendar from './HabitCalendar';
import { getCalendarDays } from '@utils/getCalendarDays';
import HabitStreak from './HabitStreak';
import Button from '@ui/Button';
import { useAppDispatch } from '@app/hooks';
import { deleteHabitThunk, updateHabitThunk } from '../habitsSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from '@styles/habitDetailInfo.module.css';
import editableStyles from '@styles/editable.module.css';

interface Props {
  habit: Habit;
}

function HabitDetailInfo({ habit }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const textRef = useRef<HTMLDivElement>(null);
  const [description, setDescription] = useState('Добавьте описание вашей привычки...');
  const [showHint, setShowHint] = useState(false);

  const percent = Math.floor((habit.currentCount / habit.targetCount) * 100);

  useEffect(() => {
    setShowHint(true);
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    if (textRef.current) {
      const newDescription = textRef.current.innerText.trim();

      dispatch(
        updateHabitThunk({
          habitId: habit.id,
          newData: { ...habit, description: newDescription },
        }),
      )
        .unwrap()
        .then(() => {
          setDescription(newDescription);
          navigate('/habits');
        });
    }
  };

  const handleDelete = () => {
    dispatch(deleteHabitThunk(habit.id));
    navigate('/habits');
  };

  return (
    <main className={styles.info}>
      <div className={styles.info__description}>
        <div className={styles.info__title}>Описание</div>
        <div
          ref={textRef}
          className={`${styles.info__text} ${editableStyles.editable} ${showHint ? editableStyles.editable_hint : ''}`}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {habit.description || description}
        </div>
      </div>
      <div className={styles.info__title}>Статистика</div>
      <section className={`${styles.info__statistics} ${styles.statistics}`}>
        <div className={styles.statistics__progression}>
          <div className={styles.statistics__title}>
            Прогресс выполнения:{' '}
            <span className={styles.statistics__completed}>
              выполнено {habit.currentCount} из {habit.targetCount} дней ({percent}%)
            </span>
          </div>
          <ProgressBar
            completed={percent}
            bgColor="#3e2723"
            baseBgColor="#e9e0d6"
            height="6px"
            isLabelVisible={false}
          />
        </div>
        <div className={styles.info__streak}>
          <HabitStreak habit={habit} />
        </div>
        <div className={styles.statistics__buttons}>
          <Button
            text="Сохранить изменения"
            className={styles.statistics__edit}
            onClick={handleEdit}
          />
          <Button text="Удалить" className={styles.statistics__delete} onClick={handleDelete} />
        </div>
      </section>
      <div className={styles.info__calendar}>
        <HabitCalendar
          completedDates={habit.completedDates}
          calendarDays={getCalendarDays('month')}
        />
      </div>
    </main>
  );
}

export default HabitDetailInfo;
