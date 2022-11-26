
import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Auth = () => {
  console.log("Auth");

  const {
    authState: { isLoading, isAuthenticated },
  } = useAppContext();
  let body;

  if (isLoading) {
    body = <></>;
  } else if (!isAuthenticated) {
    body = <Outlet />;
  } else {
    body = <Navigate to="/home" />;
  }

  return <>{body}</>;
};

export default Auth;
