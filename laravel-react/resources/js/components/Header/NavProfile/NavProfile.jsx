import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { UserAvatar } from '../../common/Avatar/Avatar';
import { Link } from 'react-router-dom';
import './NavProfile.css';

export const NavProfile = ({
  userName,
  // userAvatar,
  userId,
}) => {
  const onLogout = () => {};

  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} id="dropdown-profile-details">
        <UserAvatar
          size="40"
          name={userName}
          src={null}
          round={true}
          className="userAvatar"
          showTooltip={false}
        />
        <span className="text-light userName">{userName}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={'/profile'}>
          <div className="d-flex align-items-center">
            <i className="bi bi-person"></i>
            Profile
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to={'/user/favourites'}>
          Мои сериалы
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={'/movies'}>
          Все сериалы
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={'/user/recommendations'}>
          Рекомендации
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={'/user/settings'}>
          Настройки
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>Выйти</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
