import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FormAuth.css';
import { login } from '../../store/actions/currentUser';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

export default function FormAuth() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldErrorBeShown, setShouldErrorBeShown] = useState(false);

  const { preloader, user, error } = useSelector(
    (state) => state.currentUserReducer,
  );

  useEffect(() => {
    if (error.status && shouldErrorBeShown) {
      toast.error(error.errorMessage);
      setShouldErrorBeShown(false);
    }
  }, [error.status]);

  useEffect(() => {
    if (user.id) {
      history.push('/profile');
    }
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setShouldErrorBeShown(true);
      const formData = { email, password };
      dispatch(login(formData));
      setPassword('');
    },
    [dispatch, email, password],
  );

  return (
    <React.Fragment>
      <h3 className="center-text">Заходите!</h3>
      <form className="form__auth" onSubmit={handleSubmit} name="auth">
        <label htmlFor="email">Электронная почта</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <input type="submit" value="ВОЙТИ"></input>
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
