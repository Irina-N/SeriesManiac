import React from 'react';
import { useHistory } from 'react-router-dom';
import FormAuth from './FormAuth';
import Header from '../Header/Header';
import './Auth.css';

export default function Auth() {
  const history = useHistory();

  const handleOnClick = () => {
    history.push('/register');
  };

  return (
    <div className="content">
      <Header />
      <FormAuth />
      <h3 className="center-text">Ещё нет аккаунта?</h3>
      <div className="content-back">
        <button
          className="btn btn-warning"
          onClick={handleOnClick}
          id="singup_btn"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}
