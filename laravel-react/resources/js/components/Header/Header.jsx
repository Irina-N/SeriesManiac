import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { NavProfile } from './NavProfile/NavProfile';

import './Header.css';

export default function Header() {
  const { user } = useSelector((state) => state.currentUserReducer);

  return (
    user.id ? (
      <NavProfile userName={user.login} />
    ) : (
      <Container fluid='lg' className='header'>
        <Row className='align-items-center p-3'>
          <Col xs={12}>
            <h1 className='text-warning header__title text-center'>
              SериальныйMaньяK
            </h1>
          </Col>
        </Row>
      </Container>
    )
  );
}