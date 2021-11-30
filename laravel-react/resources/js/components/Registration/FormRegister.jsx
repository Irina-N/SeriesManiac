import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { register } from '../../store/actions/currentUser';

import './FormRegister.css';

export default function FormRegister() {
  const dispatch = useDispatch();
  const form = useRef(null);

  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    form.current.focus();
  }, []);

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
    <Container className='narrow-container'>
      <Row className='mt-3 mb-2'>
        <Col>
          <h3 className='text-center'>Регистрация</h3>
        </Col>
      </Row>

      <Row className='bg-dark'>
        <Col>
          <Form
            name='auth'
            id='form_reister'
            className='p-3'
            ref={form}
            onSubmit={handleSubmit}
            align='center'
          >
            <Form.Group
              className='mb-3'
              align='start'
              controlId='email'
            >
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control
                required
                type='email'
                name='email'
                className='w-100 m-auto'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group
              className='mb-3'
              align='start'
              controlId='email'
            >
              <Form.Label>Логин</Form.Label>
              <Form.Control
                required
                type='login'
                name='login'
                className='w-100 m-auto'
                value={login}
                onChange={(e) => setLogin(e.target.value)} />
            </Form.Group>

            <Form.Group
              className='mb-3'
              align='start'
              controlId='password'
            >
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                required
                type='password'
                name='password'
                className='w-100 m-auto'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className='mb-3'
              align='start'
              controlId='password2'
            >
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control
                required
                type='password'
                name='password2'
                className='w-100 m-auto'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Form.Group>

            <Button
              as='input'
              id='sign_up-btn'
              type='submit'
              variant='success'
              className='btn text-uppercase mt-1'
              value='зарегистрироваться'
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
