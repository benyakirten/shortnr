import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input/Input.component';
import Form from '../../components/Form/Form.component';
import Loading from '../../components/Loading/Loading.component';
import Button from '../../components/Button/Button.component';

import styles from './Home.module.css';

import { validateLink } from '../../lib/validation';
import useValidity from '../../hooks/useValidation';

const Home = () => {
  const [search, setSearch, valid] = useValidity([validateLink()]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setError] = useState(null);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setSearch('');
    if (!validateLink(search)) {
      setLoading(false);
      return setError('URL format incorrect')
    }
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: search })
      });
      if (!res.ok) {
        throw new Error('Unable to generate shortened URL');
      }

      const val = await res.json();
      setResult(val.short);
    }
    catch (e) {
      setError(`Error occurred: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container">
      <p>Shorten Your URL:</p>
      <Form onSubmit={handleSubmit}>
        <Input text={search} onChange={setSearch} placeholder="Full website link" />
        <Button disabled={!valid} type="submit">Submit</Button>
      </Form>
      {err && (
        <p className={`${styles.result} ${styles.error}`}>{err}</p>
      )}
      {!err && loading && !result && (
        <Loading />
      )}
      {!err && !loading && result && (
        <Link className={`${styles.result} ${styles.success}`} to={`/${result}`}>{process.env.DOMAIN || 'http://localhost:3000'}/{result}</Link>
      )}
    </div>
  );
};

export default Home;