import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { NavProfile } from './NavProfile/NavProfile';

import './Header.css';

export default function Header() {
  const history = useHistory();
  const { user } = useSelector((state) => state.currentUserReducer);

  return (
    <header className='header'>
      {user.id && (
        <i 
          className='far fa-arrow-alt-circle-left btn-back'
          onClick={history.goBack}
        >
        </i>
      )}
      <h1 className='header__title center-text'>SериальныйMaньяK</h1>
      {user.id && (
        <Navbar>
          <NavProfile userName={user.login} />
        </Navbar>
      )}
    </header>
  );
}