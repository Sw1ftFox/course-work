import type { ButtonProps } from '@/shared/types';
import { Link } from 'react-router-dom';
import Button from '@ui/Button';
import { useState } from 'react';
import { validateEmail, validatePassword } from '@utils/validation';
import styles from '@styles/auth.module.css';
import validationStyles from '@styles/validation.module.css';

type Props = {
  title: string;
  link: string;
  linkText: string;
  buttons: ButtonProps[];
};

function AuthPage({ title, link, linkText, buttons }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isValid: isValidEmail, message: messageEmail } = validateEmail(email);
  const { isValid: isValidPassword, message: messagePassword } = validatePassword(password);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.auth}>
      <header className={styles.auth__header}>
        <h2>{title}</h2>
      </header>

      <form onSubmit={event => onSubmit(event)} className={styles.auth__form}>
        <input
          className={`${styles.auth__input} ${isValidEmail ? validationStyles.valid : validationStyles.invalid}`}
          type="email"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="Введите ваш email..."
        />
        {!isValidEmail && <div className={validationStyles.errorMessage}>{messageEmail}</div>}
        <input
          className={`${styles.auth__input} ${isValidPassword ? validationStyles.valid : validationStyles.invalid}`}
          type="password"
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="Введите ваш пароль..."
        />
        {!isValidPassword && <div className={validationStyles.errorMessage}>{messagePassword}</div>}
        <Link className={styles.auth__link} to={link}>
          {linkText}
        </Link>
        <div className={styles.auth__buttons}>
          {buttons.map((button, id) => (
            <Button
              key={id}
              type={button.type}
              text={button.text}
              className={button.className}
              onClick={button.onClick}
              args={[email, password]}
            />
          ))}
        </div>
      </form>
    </div>
  );
}

export default AuthPage;
