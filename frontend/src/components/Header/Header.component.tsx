import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Button from '../Button/Button.component';
import Input from '../Input/Input.component';

import useValidity from '../../hooks/useValidation';
import { validateLength } from '../../lib/validation';

import styles from './Header.module.css';

const Header: React.FC = () => {
  const [link, setLink, valid] = useValidity([validateLength()]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigate(`/${link}`)
  }
  return (
    <header className={styles.header}>
      <div className={styles.linkGroup}>
        <Link className={location.pathname === '/' ? 'current' : ''} to="/">Home</Link>
      </div>
      <div className={styles.linkGroup}>
        <Input placeholder="Shortened URL" text={link} onChange={setLink} />
        <Button disabled={!valid} onClick={handleClick}>Go</Button>
      </div>
    </header>
  )
};

export default Header;