import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavProfile } from './NavProfile/NavProfile';
import './Header.css';

export default function Header() {
  const { user } = useSelector((state) => state.currentUserReducer);

  return (
    <header className="d-flex">
      <h1 className="header__title center-text">SериальныйMaньяK</h1>
      {user.id && (
        <Navbar>
          <NavProfile userName={user.login} />
        </Navbar>
      )}
    </header>
  );
}
