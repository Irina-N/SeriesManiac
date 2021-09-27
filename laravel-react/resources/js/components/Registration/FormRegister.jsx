import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import { register, clearUsersError } from '../../store/actions/currentUser';

import './FormRegister.css';

export default function FormRegister() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { user, preloader, error } = useSelector(
    (state) => state.currentUserReducer,
  );

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
      dispatch(clearUsersError());
    }
  }, [error.status]);

  useEffect(() => {
    if (user.id) {
      history.push('/movies');
    }
  }, [user]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = { email, login, password, passwordConfirmation };
      dispatch(register(formData));
      setPassword('');
      setPasswordConfirmation('');
    },
    [dispatch, email, login, password, passwordConfirmation],
  );

  return (
    <React.Fragment>
      <form
        className="form__signup bg-dark"
        onSubmit={handleSubmit}
        name="sing_up"
      >
        <label htmlFor="email">Электронная почта</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="login">Логин</label>
        <input
          required
          type="text"
          id="login"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        ></input>

        <label htmlFor="password">Пароль</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <label htmlFor="password2">Повторите пароль</label>
        <input
          required
          type="password"
          id="password2"
          name="password2"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        ></input>

        <input type="submit" value="ЗАРЕГИСТРИРОВАТЬСЯ"></input>
      </form>
      {preloader && (
        <div
          id="spinner"
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="warning" />
        </div>
      )}
    </React.Fragment>
  );
}
