import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import { login, clearUsersError } from '../../store/actions/currentUser';

import './FormAuth.css';

export default function FormAuth() {
  const dispatch = useDispatch();
  /* const history = useHistory(); */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* const { preloader, user, error } = useSelector(
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
  }); */

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = { email, password };
      dispatch(login(formData));
      setPassword('');
    },
    [dispatch, email, password],
  );

  return (
    <Container>
      <Row className='mt-3 mb-2'>
        <Col>
          <h3 className='text-center'>Заходите!</h3>
        </Col>
      </Row>
      <Row className='form__auth bg-dark'>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control
                type="email"
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              as="input"
              type="submit"
              variant='success'
              className='btn text-uppercase'
              value='войти'
            />
          </Form>

          {/* <form className='form__auth w-100 d-flex flex-column justify-content-start flex-nowrap' onSubmit={handleSubmit} name='auth'>
            <label htmlFor='email'>Электронная почта</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label htmlFor='password'>Пароль</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <Button
              as="input"
              type="submit"
              variant='success'
              className='btn text-uppercase'
              value='войти'
            />
          </form> */}
        </Col>
      </Row>
      {/* 
      {preloader && (
        <div
          id='spinner'
          className='d-flex justify-content-center align-items-center'
        >
          <Spinner animation='border' variant='warning' />
        </div>
      )} */}
    </Container>
  );
}
