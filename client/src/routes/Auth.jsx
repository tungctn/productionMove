import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Auth = () => {
  const {
    authState: { isLoading, isAuthenticated, user, url },
  } = useAppContext();

  let body;

  if (isLoading) {
    body = <></>;
  } else if (!isAuthenticated) {
    body = <Outlet />;
  } else {
    switch (user?.role) {
      case 1:
        body = <Navigate to="/productline" />;
        break;
      default:
        body = <Navigate to="/home" />;
    }
  } 
//   else {
//     body = <Navigate to={url} />;
//   }

  return <>{body}</>;
};

export default Auth;
