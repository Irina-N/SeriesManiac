import { useDispatch } from 'react-redux';

import { Container, Navbar, Nav } from 'react-bootstrap';
import { UserAvatar } from '../../common/Avatar/Avatar';

import { logout } from '../../../store/actions/currentUser';

import './NavProfile.css';

export const NavProfile = ({ userName }) => {
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
            <Nav.Link href='/movies' className='text-center'>Все сериалы</Nav.Link>
            <Nav.Link href='/user/movies' className='text-center'>Мои сериалы</Nav.Link>
            <Nav.Link href='/user/recommendations' className='text-center'>Рекомендации</Nav.Link>
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
{/* <Dropdown as={NavItem} align='end' >
      <Dropdown.Toggle as={NavLink} id='dropdown-profile-details'>
        <UserAvatar
          size='40'
          name={userName}
          src={null}
          round={true}
          className='userAvatar'
          showTooltip={false}
        />
        <span className='text-light userName'>{userName}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={'/movies'}>
          Все сериалы
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={'/user/movies'}>
          Мои сериалы
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={'/user/recommendations'}>
          Рекомендации
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>Выйти</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}