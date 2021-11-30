import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import FormAuth from './FormAuth';
import Header from '../Header/Header';
import { clearUsersError } from '../../store/actions/currentUser';

import './Auth.css';

export default function Auth() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { preloader, user, error } = useSelector(
    (state) => state.currentUserReducer,
  );

  useEffect(() => {
    if (user.id) {
      history.push('/movies');
    }
  });

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
      dispatch(clearUsersError());
    }
  }, [error.status]);

  const handleOnClick = () => {
    history.push('/register');
  };

  return (
    <>
      <Header />
      {preloader ? (
        <Container className='narrow-container'>
          <Row>
            <Col id='spinner'>
              <Spinner animation='border' variant='warning' />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <FormAuth />
          <Container className='narrow-container'>
            <Row className='mt-3 mb-2'>
              <Col>
                <h3 className='text-center'>Ещё нет аккаунта?</h3></Col>
            </Row>
            <Row className='bg-dark p-4'>
              <Col align='center' >
                <Button
                  variant='warning'
                  className='btn text-uppercase'
                  onClick={handleOnClick}
                  id='singup_btn'
                >
                  Зарегистрироваться
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
