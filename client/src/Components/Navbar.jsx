import React, { useContext, useEffect, useState } from 'react';
import { Menu, Icon, Button, Spin } from 'antd';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../queries/User';

const Navbar = props => {
  const token = localStorage.getItem('auth');
  const history = useHistory();

  const { logOut } = useContext(AuthContext);
  const client = useApolloClient();

  const [current, setCurrent] = useState(undefined);

  useEffect(() => {
    setCurrent(history.location.pathname);
  }, [history.location.pathname]);

  const handleClick = e => {
    setCurrent(e.key);
  };

  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    await client.resetStore();
    logOut();
    setLoading(false);
    history.replace('/signin');
  };

  return !token ? (
    <UnAuthNav handleClick={handleClick} path={current} />
  ) : (
    <AuthNav
      handleClick={handleClick}
      handleSignOut={handleSignOut}
      path={current}
      loading={loading}
    />
  );
};

const AuthNav = ({ handleClick, path, handleSignOut, loading }) => {
  const { getUserData } = useContext(AuthContext);
  useQuery(GET_CURRENT_USER, {
    onCompleted({ getCurrentUser }) {
      console.log(getCurrentUser)
      getUserData(getCurrentUser);
    },
  });
  return (
    <Menu onClick={handleClick} selectedKeys={[path]} mode="horizontal">
      <Menu.Item key="/">
        <Link to={'/'}>
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/recipe/add">
        <Link to={'/recipe/add'}>
          <Icon type="plus" />
          Add Recipes
        </Link>
      </Menu.Item>
      <Menu.Item key="/profile">
        <Link to={'/profile'}>
          <Icon type="profile" />
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item
        style={{ position: 'absolute', right: '0', top: '0' }}
        key="logout"
      >
        <Button
          type="danger"
          icon="logout"
          onClick={handleSignOut}
          style={{
            backgroundColor: loading && '#fff',
            width: '7rem',
            lineHeight: '2',
          }}
        >
          {loading ? <Spin /> : 'Logout'}
        </Button>
      </Menu.Item>
    </Menu>
  );
};
const UnAuthNav = ({ handleClick, path }) => {
  return (
    <Menu onClick={handleClick} selectedKeys={[path]} mode="horizontal">
      <Menu.Item key="/">
        <Link to={'/'}>
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/signin">
        <Link to={'/signin'}>
          <Icon type="login" />
          Sign in
        </Link>
      </Menu.Item>
      <Menu.Item key="/signup">
        <Link to={'/signup'}>
          <Icon type="edit" />
          Sign up
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
