import React, { useContext, useState } from 'react';
import { Form, Input, Button, Spin, Row, Col } from 'antd';
import { MainContainer } from '../Components/styleComponent/index';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../queries/User';
import { errorMessage } from '../utils/Notification';
import { AuthContext } from '../utils/AuthContext';

const RegistrationForm = props => {
  const {
    validateFieldsAndScroll,
    getFieldValue,
    validateFields,
    getFieldDecorator,
  } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);

  const { logIn } = useContext(AuthContext);

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    update(cash, { data: { signUpUser } }) {
      logIn(signUpUser);
      props.history.replace({
        pathname: '/',
        state: { active: true },
      });
    },
    onError({ graphQLErrors }) {
      errorMessage(graphQLErrors[0].message);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        await signUp({ variables: values });
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  };

  return (
    <MainContainer>
      <Row type="flex" justify="center" align="middle">
        <Col xs={18} sm={12} md={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your UserName!',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="UserName" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input placeholder="E-mail" />)}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              })(<Input.Password placeholder="Password" />)}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  onBlur={handleConfirmBlur}
                  placeholder="Confirm Password"
                />,
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                style={{ width: '7rem', lineHeight: '2' }}
              >
                {loading ? <Spin /> : 'Register'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Form.create({ name: 'register' })(RegistrationForm);
