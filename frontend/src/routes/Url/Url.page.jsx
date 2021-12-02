import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { exactLength, validateLink } from '../../lib/validation';

import Loading from '../../components/Loading/Loading.component';

import styles from './Url.module.css'

const Url = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    async function navigateToLink() {
      const short = location.pathname.slice(1);
      if (!exactLength(short, 5)) {
        return false;
      }

      const res = await fetch(`/api/${short}`);
      if (!res.ok) {
        return false;
      }

      const data = await res.json();
      const destination = data.origin;

      if (!validateLink(destination)) {
        return false;
      }

      return destination;
    }
    if (location && location.pathname) {
      navigateToLink().then(res => {
        if (!res) {
          return navigate('/');
        }
        window.location.href = res
      });
    }
  }, [location, navigate]);
  return (
    <div className="container">
      <p className={styles.text}>Loading your link...</p>
      <Loading />
    </div>
  );
}

export default Url;