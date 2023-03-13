import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Loading from '../../components/loading/Loading';
import './index.scss'

const Login = () => {
  "use strict"
  const { handleLogin } = useAppContext();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    await handleLogin(values);
    setLoading(false);
  };
  return (
    <div className="form-login">
      <h1>Đăng nhập</h1>
      <Loading spinning={loading}>
        <Form
          name="basic"
          style={{
            padding: '0 30px',
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
};

export default Login;
