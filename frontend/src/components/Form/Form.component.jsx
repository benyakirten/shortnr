import React from 'react';

const Form = ({ onSubmit, children }) => {
  const _handleSubmit = (e) => {
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