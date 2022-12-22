import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const RequireAuth = () => {
  console.log("RequireAuth");
  const {
    authState: { isLoading, isAuthenticated },
  } = useAppContext();

  if (isLoading) {
    return <></>;
  }

  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RequireAuth;
