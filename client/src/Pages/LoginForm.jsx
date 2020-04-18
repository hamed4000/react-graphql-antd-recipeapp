import React, { useContext, useEffect } from 'react';
import { Form, Icon, Input, Button, Col, Row, Spin } from 'antd';
import { MainContainer } from '../Components/styleComponent/index';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from '../queries/User';
import { AuthContext } from '../utils/AuthContext';
import { errorMessage } from '../utils/Notification';

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const LoginForm = props => {
  const {
    validateFields,
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
  } = props.form;

  const { logIn } = useContext(AuthContext);

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    update(cash, { data: { signInUser } }) {
      logIn(signInUser);
      props.history.replace({
        pathname: '/',
      });
    },
    onError({ graphQLErrors }) {
      errorMessage(graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const handleSubmit = e => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        await signIn({ variables: values });
      }
    });
  };

  // Only show error after a field is touched.
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');

  return (
    <MainContainer>
      <Row type="flex" justify="center" align="middle">
        <Col xs={18} sm={12} md={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Item
              validateStatus={usernameError ? 'error' : ''}
              help={usernameError || ''}
            >
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />,
              )}
            </Form.Item>

            <Form.Item
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading || hasErrors(getFieldsError())}
                style={{ width: '7rem', lineHeight: '2' }}
              >
                {loading ? <Spin /> : 'Login'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Form.create({ name: 'login' })(LoginForm);
