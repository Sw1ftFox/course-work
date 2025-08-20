import Header from '@layout/Header';
import HabitDetailInfo from '@habits/components/HabitDetailInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Habit } from '@habits/types';
import styles from '@styles/habitDetailInfo.module.css';

function HabitDetailPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { habit: Habit } };
  const habit = state.habit;

  return (
    <>
      <Header
        title={habit.title}
        buttonProps={{
          text: 'Назад',
          className: `${styles.header__button}`,
          onClick: () => {
            navigate('/habits');
          },
        }}
      />
      <HabitDetailInfo habit={habit} />
    </>
  );
}

export default HabitDetailPage;
