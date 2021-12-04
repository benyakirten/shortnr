import React from 'react';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  }
  return (
    <form onSubmit={_handleSubmit}>
      {children}
    </form>
  );
};

export default Form;