import React from 'react';

import styles from './Loading.module.css';

interface LoadingProps {
  size?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = '2rem' }) => {
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