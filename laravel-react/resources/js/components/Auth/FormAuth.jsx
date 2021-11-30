import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { login } from '../../store/actions/currentUser';

import './FormAuth.css';

export default function FormAuth() {
  const dispatch = useDispatch();
  const form = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    form.current.focus();
  }, []);

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
    <Container className='narrow-container'>
      <Row className='mt-3 mb-2'>
        <Col>
          <h3 className='text-center'>Заходите!</h3>
        </Col>
      </Row>
      <Row className='bg-dark'>
        <Col>
          <Form
            name='auth'
            id='form_auth'
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
                type='email'
                name='email'
                className='w-100 m-auto'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group
              className='mb-3'
              align='start'
              controlId='password'
            >
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type='password'
                name='password'
                className='w-100 m-auto'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              as='input'
              id='log_in-btn'
              type='submit'
              variant='success'
              className='btn text-uppercase mt-1'
              value='войти'
            />
          </Form>
        </Col>
      </Row>
    </Container >
  );
}
