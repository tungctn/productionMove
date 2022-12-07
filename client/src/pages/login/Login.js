import { Button } from "antd";
import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import removeCookie from "../../hooks/removeCookie";
import "./index.css";

const Login = () => {
  useEffect(() => {
    
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
