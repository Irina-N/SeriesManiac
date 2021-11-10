import { useDispatch } from 'react-redux';

import { Container, Navbar, Nav } from 'react-bootstrap';

import { logout } from '../../../store/actions/currentUser';

import './NavProfile.css';

export const NavProfile = ({ currentComponent }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };


  return (
    <Navbar expand='md' variant='dark' className='p-0'>
      <Container fluid='lg' className='justify-content-between align-items-end py-2 w-100 m-auto'>
        <Navbar.Brand
          href='/movies'
          className='ps-2 pb-0'
        >
          SериальныйMaньяK
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' id='navbar-toggler' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='justify-content-end'
        >
          <Nav>
            <Nav.Link
              href='/movies'
              className={`text-center ${currentComponent === 'movies' ? 'active-page' : ''}`}
            >
              Все сериалы
            </Nav.Link>
            <Nav.Link
              href='/user/movies'
              className={`text-center ${currentComponent === 'userMovies' ? 'active-page' : ''}`}
            >
              Мои сериалы
            </Nav.Link>
            <Nav.Link
              href='/user/recommendations'
              className={`text-center ${currentComponent === 'recommendMovies' ? 'active-page' : ''}`}
            >
              Рекомендации
            </Nav.Link>
            <Nav.Link
              href='#'
              className='pe-xs-0 pe-md-2 pe-lg-1 text-center'
              onClick={onLogout}
            >
              Выйти
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};