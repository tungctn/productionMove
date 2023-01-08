import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const RequireAuth = () => {
  const {
    authState: { isLoading, isAuthenticated },
  } = useAppContext();

  if (isLoading) {
    return <></>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
