import type { ButtonProps } from '../types';
import styles from '@styles/button.module.css';

function Button({ type, text, className, onClick, args }: ButtonProps) {
  const handleClick = () => {
    if (onClick && args) {
      onClick(...args);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type ? type : 'button'}
      className={`${styles.button} ${className ? className : ''}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
