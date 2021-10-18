import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Header from '../Header/Header';
import FormRegister from './FormRegister';
import { clearUsersError } from '../../store/actions/currentUser';

import './Registration.css';

export default function Registration() {
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
      toast.error(error.Message);
      dispatch(clearUsersError());
    }
  }, [error.status]);

  const handleOnClick = () => {
    history.push('/');
  }

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
          <FormRegister />
          <Container className='narrow-container'>
            <Row className='mt-3 mb-2'>
              <Col>
                <h3 className='text-center'>Уже есть аккаунт?</h3>
              </Col>
            </Row>
            <Row className='bg-dark p-4'>
              <Col align='center' >
                <Button
                  variant='warning'
                  className='btn text-uppercase'
                  onClick={handleOnClick}
                  id='login_btn'
                >
                  Войти
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

