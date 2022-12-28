import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Auth = () => {
  console.log("Auth");
  const [location, setLocation] = useState("/home");

  const {
    authState: { isLoading, isAuthenticated, user, url },
    openNotification,
    loadUser,
  } = useAppContext();

  let body;
  // useEffect(() => {
  //   if (url === "/") {
  //     switch (user?.role) {
  //       case 1:
  //         url = "/productline";
  //         break;
  //       default:
  //         url = "/home";
  //     }
  //   }
  // }, [url]);

  if (isLoading) {
    body = <></>;
  } else if (!isAuthenticated) {
    body = <Outlet />;
    openNotification("error", "Bạn cần đăng nhập để truy cập trang này");
  } else {
    switch (user.role) {
      case 1:
        url = "/productline";
        break;
      case 2:
      case 3:
      case 4:
        url = "/home";
        break;
      default:
        url = "/";
    }
    body = <Navigate to={url} />;
  }

  return <>{body}</>;
};

export default Auth;
