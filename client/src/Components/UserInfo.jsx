import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import UserRecipe from './UserRecipe';
import Loading from './Loading';
import { Row, Col } from 'antd';

const UserInfo = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('fa-IR');
    const newTime = new Date(date).toLocaleTimeString('fa-IR');
    return `${newDate} at ${newTime}`;
  };

  if (!user) return <Loading />;

  return (
    <>
      <Row>
        <Col>
          <h3>User Info</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Join Date: {formatDate(user.joinDate)}</p>
        </Col>
      </Row>
      <UserRecipe user={user} />
    </>
  );
};

export default UserInfo;
