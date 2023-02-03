import { Outlet, Navigate } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import { useAppContext } from '../contexts/AppContext';

const Auth = () => {
  console.log('Auth');
  const {
    authState: { isLoading, isAuthenticated, user, url },
  } = useAppContext();

  let body;

  if (isLoading) {
    body = (
      <Loading spinning={true}>
        <p className="h-[800px]"></p>
      </Loading>
    );
  } else if (!isAuthenticated) {
    body = <Outlet />;
  } else if (url === '/') {
    switch (user?.role) {
      case 1:
        body = <Navigate to="/productline" />;
        break;
      default:
        body = <Navigate to="/home" />;
    }
  } else {
    body = <Navigate to={url} />;
  }

  return <>{body}</>;
};

export default Auth;
