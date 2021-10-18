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
{/* <Container
      fluid='lg'
      className='header'
    >
      <Row className={`${user.id ? 'justify-content-between' : 'justify-content-center'} align-items-center pl-2 pr-0 pt-3 pb-3`}>
        <Col xs={10} sm={8} md={7}>
          <h1
            className={`text-warning header__title ${user.id ? 'text-left' : 'text-center'}`}
          >
            SериальныйMaньяK
          </h1>
        </Col>
        {user.id && (
          <Col xs={2} sm={4} md={5}>
            <Navbar>
              <NavProfile userName={user.login} />
            </Navbar>
          </Col>
        )}
      </Row>
    </Container> */}