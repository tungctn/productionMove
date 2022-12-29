import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const RequireAuth = () => {
  //console.log("RequireAuth");
  const {
    authState: { isLoading, isAuthenticated },
    openNotification,
  } = useAppContext();

  if (isLoading) {
    return <></>;
  }
  if (!isAuthenticated) {
    openNotification("error", "Bạn chưa đăng nhập");
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
