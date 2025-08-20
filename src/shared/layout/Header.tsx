import Button from '@ui/Button';
import type { ButtonProps } from '../types';
import styles from '@styles/header.module.css';

interface Props {
  title: string;
  buttonProps: ButtonProps;
}

function Header({ title, buttonProps }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.header__title}>{title}</div>
      <Button {...buttonProps} />
    </header>
  );
}

export default Header;
