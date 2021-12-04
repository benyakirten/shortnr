import React from 'react';

import styles from './Input.module.css';

interface InputProps {
  type?: string,
  text?: string,
  onChange: (val: string) => void,
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type = 'text', text = '', onChange, placeholder = 'Input data' }) => {
  return (
    <input
      placeholder={placeholder}
      className={styles.input}
      onChange={e => onChange(e.target.value)}
      value={text}
      type={type}
    />
  );
};

export default Input;