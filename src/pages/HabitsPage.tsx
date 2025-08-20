import { useState } from 'react';
import Header from '@layout/Header';
import HabitList from '@habits/components/HabitList';
import HabitForm from '@habits/components/HabitForm';
import headerStyles from '@styles/header.module.css';
import pageStyles from '@styles/habitsPage.module.css';

function HabitsPage() {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const openForm = () => {
    setIsOpenForm(prev => !prev);
  };

  return (
    <div className={pageStyles.page}>
      <Header
        title="Мои привычки"
        buttonProps={{
          text: isOpenForm ? 'Вернуться' : 'Добавить привычку',
          className: headerStyles.header__button,
          onClick: () => openForm(),
        }}
      />
      {isOpenForm ? <HabitForm setIsOpenForm={setIsOpenForm} /> : <HabitList />}
    </div>
  );
}

export default HabitsPage;
