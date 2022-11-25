import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext, useAppContext } from "../../contexts/AppContext";
import "./index.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin, authState } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = (values) => {
    handleLogin(values);
  };

  const authSubmit = () => {
    handleLogin({ email: email, password: password });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // console.log(authState);
  }, []);

  return (
    <div className="form-login">
      <h1>DANG NHAP</h1>
      <Form
        name="basic"
        style={{
          padding: "0 30px",
        }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
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
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            onChange={(e) => setEmail(...email, e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            onChange={(e) => setPassword(...password, e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" onClick={authSubmit}>
            Dang nhap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
