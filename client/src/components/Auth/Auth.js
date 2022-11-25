import { useEffect } from "react";
import AppContextProvider, { useAppContext } from "../../contexts/AppContext";
import { Spin } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { SET_AUTH_BEGIN } from "../../contexts/action";

const Auth = () => {
  console.log("Auth");

  const {
    authState: { isLoading, isAuthenticated },
  } = useAppContext();
  let body;

  if (isLoading) {
    body = (
      <></>
    );
  } else if (!isAuthenticated) {
    body = <Outlet />;
  } else {
    body = <Navigate to="/home" />;
  }

  return <>{body}</>;
};

export default Auth;
