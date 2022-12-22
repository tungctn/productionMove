import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const RequireNotAdmin = () => {
  const {
    authState: { user },
    openNotification,
  } = useAppContext();
  return user.role === 1 ? (
    openNotification("error", "you are not authorized")
  ) : (
    <Outlet />
  );
};

export default RequireNotAdmin;
