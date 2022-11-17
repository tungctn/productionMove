import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppContext";
import "./index.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin, authState } = useContext(AppContext);
  const onFinish = (values) => {
    handleLogin(values);
    console.log(authState)
    if (authState.isAuthenicated) {
      navigate("/home");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-login">
      <h1>DANG NHAP</h1>
      <Form
        name="basic"
        style={{
          padding: "0 30px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}>
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Dang nhap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
