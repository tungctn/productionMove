import { Outlet, Navigate } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import { useAppContext } from '../contexts/AppContext';

const RequireAuth = () => {
  console.log('RequireAuth');
  const {
    authState: { isLoading, isAuthenticated },
  } = useAppContext();

  if (isLoading) {
    return (
      <Loading spinning={true}>
        <p className="h-[800px]"></p>
      </Loading>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
