import { useEffect } from 'react';
import AuthPage from '@pages/AuthPage';
import HabitsPage from '@pages/HabitsPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@services/firebase';
import {
  loginUser,
  loginUserWithGoogle,
  registerUser,
  selectCurrentUser,
  setUser,
} from '@auth/authSlice';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HabitDetailPage from '@pages/HabitDetailPage';
import { useAppDispatch, useAppSelector } from './hooks';
import ProtectedRoute from '@layout/ProtectedRoute';
import ErrorMessage from '@ui/ErrorMessage';
import styles from '@styles/auth.module.css';
import '@styles/global.css';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(setUser(parsedUser));
    }
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/habits' : '/login'} />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/habits" />
            ) : (
              <AuthPage
                title="Страница входа"
                link="/register"
                linkText="У вас еще нет аккаунта?"
                buttons={[
                  {
                    type: 'submit',
                    text: 'Войти',
                    className: `${styles.auth__button}`,
                    onClick: (email: string, password: string) => {
                      dispatch(loginUser({ email, password }))
                        .unwrap()
                        .then(() => navigate('/habits'));
                    },
                  },
                  {
                    type: 'submit',
                    text: 'Войти с Google',
                    className: `${styles.auth__button} ${styles.google}`,
                    onClick: () => {
                      dispatch(loginUserWithGoogle())
                        .unwrap()
                        .then(() => navigate('/habits'));
                    },
                  },
                ]}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/habits" />
            ) : (
              <AuthPage
                title="Страница регистрации"
                link="/login"
                linkText="У вас уже есть аккаунт?"
                buttons={[
                  {
                    type: 'submit',
                    text: 'Зарегистрироваться',
                    className: `${styles.auth__button}`,
                    onClick: (email: string, password: string) => {
                      dispatch(registerUser({ email, password }))
                        .unwrap()
                        .then(() =>
                          dispatch(loginUser({ email, password }))
                            .unwrap()
                            .then(() => navigate('/habits')),
                        );
                    },
                  },
                ]}
              />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/habits/:id" element={<HabitDetailPage />} />
        </Route>

        <Route path="*" element={<ErrorMessage />} />
      </Routes>
    </div>
  );
}

export default App;
