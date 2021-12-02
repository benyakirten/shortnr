import React from 'react';

import styles from './Button.module.css';

const Button = ({ onClick = undefined, children, type = 'button', disabled = false }) => {
  const checkDisabled = () => {
    if (!disabled && onClick) onClick();
  }
  return (
    <button className={styles.button} onClick={checkDisabled} type={type} disabled={disabled}>{children}</button>
  );
};

export default Button;