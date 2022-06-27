import './Navbar.styles.scss';
import { AppstoreFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Image, Menu, Space, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { NotificationContainer } from '../../../containers/NotificationContainer/Notification.container';
import { PATH, PATH_ATTENDANT } from '../../../constants/Paths/Path';
import { logoutHandler } from '../../../redux-flow/authentication/authentication-action';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import RoleType from '../../../constants/RoleType';
import extraMenu from './MenuByRole';

const NavigationBar = () => {
  const role = useSelector((state) => state?.authentication?.user?.roles);
  const [subNavVisible, setSubNavVisible] = useState(true);
  const webSocketClient = useSelector(selectWebSocket);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    webSocketClient?.close();

    dispatch(logoutHandler());
    history.push(PATH.INDEX);
  };

  const handleRedirect = (path) => history.push(path);

  return (
    <div>
      <div className='navbar-container container-fluid'>
        <div className='Navbar'>
          <Link to={PATH.INDEX} className='logo'>
            <div style={{ display: 'flex' }}>
              <img src={'/logo/logo_with_text.svg'} style={{ width: '10rem' }} />
            </div>
          </Link>
          {!role ? <AuthenticationButtonGroups handleRedirect={handleRedirect} /> : null}

          <Space size='middle'>
            {role ? <NotificationContainer /> : null}
            {role ? (
              <>
                <Dropdown
                  overlayStyle={{ zIndex: 0 }}
                  visible={subNavVisible}
                  trigger={['click']}
                  overlay={
                    extraMenu(role) ? (
                      <div className={'sub-navbar-container'} style={{ position: 'relative', top: '20px' }}>
                        <div className='Navbar'>
                          <Menu className='menu' mode='horizontal'>
                            {extraMenu(role)}
                          </Menu>
                        </div>
                      </div>
                    ) : null
                  }>
                  <AppstoreFilled
                    style={{ fontSize: 32, color: '#FFF' }}
                    onClick={() => setSubNavVisible((preState) => !preState)}
                  />
                </Dropdown>
              </>
            ) : null}
            {role ? <AvatarMenu logoutFunction={handleClick} handleRedirect={handleRedirect} /> : null}
          </Space>
        </div>
      </div>
    </div>
  );
};

const AuthenticationButtonGroups = ({ handleRedirect }) => (
  <div style={{ display: 'flex', position: 'absolute', right: 0 }}>
    <Button
      size='large'
      shape='round'
      onClick={() => handleRedirect(PATH.LOGIN_PAGE)}
      style={{ margin: '0 0.5rem', width: '7rem' }}>
      Login
    </Button>
    <Button
      size='large'
      shape='round'
      onClick={() => handleRedirect(PATH.REGISTER_PAGE)}
      style={{ margin: '0 0.5rem', width: '7rem' }}>
      Sign up
    </Button>
  </div>
);

const AvatarMenu = ({ logoutFunction }) => {
  const history = useHistory();
  const name = useSelector((state) => state.authentication.user.fullName);
  const role = useSelector((state) => state.authentication?.user?.roles);
  const profileUrl = useSelector((state) => state.authentication?.user.profileUrl);

  const menu = (
    <Menu
      onClick={(e) => {
        switch (e.key) {
          case 'LOGOUT':
            logoutFunction();
            break;
          case 'CHANGE_PASSWORD_PAGE':
            history.push(PATH.CHANGE_PASSWORD_PAGE);
            break;
          case 'PROFILE':
            switch (role) {
              case RoleType.ATTENDANT:
                history.push(PATH_ATTENDANT.PROFILE_PAGE);
                break;
            }
        }
      }}
      style={{ zIndex: 10000000 }}>
      <Menu.Item key='PROFILE'>Account</Menu.Item>
      <Menu.Item key='CHANGE_PASSWORD_PAGE'>Change password</Menu.Item>
      <Menu.Item key='LOGOUT'>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className={'avatar'}>
      <Dropdown overlay={menu} placement='bottomRight'>
        <Avatar
          size={45}
          style={{ backgroundColor: '#87d068' }}
          icon={
            profileUrl ? <Image src={profileUrl} preview={false} style={{ cursor: 'pointer' }} /> : <UserOutlined />
          }
        />
      </Dropdown>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
        <Typography style={{ color: '#fff' }}>{name}</Typography>
      </div>
    </div>
  );
};

export default NavigationBar;
