import Button from '@ui/Button';
import { useState } from 'react';
import { selectCurrentUser } from '@auth/authSlice';
import { addHabitThunk } from '../habitsSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { validateHabitName, validateTargetDays } from '@utils/validation';
import styles from '@styles/habitForm.module.css';
import validationStyles from '@styles/validation.module.css';

interface Props {
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function HabitForm({ setIsOpenForm }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('0');
  const { isValid: isValidTitle, message: messageTitle } = validateHabitName(title);
  const { isValid: isValidTarget, message: messageTarget } = validateTargetDays(Number(target));

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAddHabit = (title: string, target: string, description?: string) => {
    if (user) {
      dispatch(
        addHabitThunk({
          title,
          userId: user.uid,
          targetCount: Number(target),
          currentCount: 0,
          completedDates: [],
          description: description || '',
        }),
      )
        .unwrap()
        .then(() => {
          setTitle('');
          setDescription('');
          setTarget('');
          setIsOpenForm(false);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form__title}>Форма добавления привычки</div>
      <div className={styles.form__field}>
        <label htmlFor="title" className={styles.form__label}>
          Имя<span style={{ color: 'red' }}>*</span>:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`${styles.form__input} ${isValidTitle ? validationStyles.valid : validationStyles.invalid}`}
          placeholder="Введите название привычки..."
        />
        {!isValidTitle && <div className={validationStyles.errorMessage}>{messageTitle}</div>}
      </div>
      <div className={styles.form__field}>
        <label htmlFor="description" className={styles.form__label}>
          Описание:
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={styles.form__textarea}
          placeholder="Введите описание..."
        />
      </div>
      <div className={styles.form__field}>
        <label htmlFor="target" className={styles.form__label}>
          Цель (раз в неделю)<span style={{ color: 'red' }}>*</span>:
        </label>
        <input
          id="target"
          type="number"
          name="target"
          value={target}
          onChange={e => setTarget(e.target.value)}
          className={`${styles.form__input} ${isValidTarget ? validationStyles.valid : validationStyles.invalid}`}
          placeholder="Введите вашу цель..."
        />
        {!isValidTarget && <div className={validationStyles.errorMessage}>{messageTarget}</div>}
      </div>
      <Button
        type="submit"
        text="Добавить привычку"
        className={styles.form__button}
        onClick={() => handleAddHabit(title, target, description)}
      />
    </form>
  );
}

export default HabitForm;
