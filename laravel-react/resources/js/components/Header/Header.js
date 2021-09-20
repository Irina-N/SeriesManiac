import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavProfile } from './NavProfile/NavProfile';
import './Header.css';

export default function Header() {
  const { user } = useSelector((state) => state.currentUserReducer);

  return (
    <h1 className="header__title center-text">
      SериальныйMaньяK
      <Navbar>
        <NavProfile
          userName={user.login}
          // userAvatar={user.avatar}
          userId={user.id}
        />
      </Navbar>
    </h1>
  );
}
