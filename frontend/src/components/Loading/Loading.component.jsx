import React from 'react';

import styles from './Loading.module.css';

const Loading = ({ size = '2rem' }) => {
  return (
    <div
      className={`${styles.loading} rotate`}
      style={{
        height: size,
        width: size
      }}
    />
  );
}

export default Loading;