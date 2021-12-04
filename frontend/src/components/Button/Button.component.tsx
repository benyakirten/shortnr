import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick = undefined, children, type = 'button', disabled = false }) => {
  const checkDisabled = () => {
    if (!disabled && onClick) onClick();
  }
  return (
    <button className={styles.button} onClick={checkDisabled} type={type} disabled={disabled}>{children}</button>
  );
};

export default Button;