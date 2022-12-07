import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Auth = () => {
  console.log("Auth");
  const [location, setLocation] = useState("/home");
  useEffect(() => {
    setLocation(window.location.pathname);
  }, [window.location.pathname]);

  const {
    authState: { isLoading, isAuthenticated, user },
  } = useAppContext();
  let body;

  if (isLoading) {
    body = <></>;
  } else if (!isAuthenticated) {
    body = <Outlet />;
  } else {
    switch (user.role) {
      case 1:
        body = <Navigate to="/productline" />;
        break;
      default:
        body = <Navigate to="/home" />;
    }
  }

  return <>{body}</>;
};

export default Auth;
