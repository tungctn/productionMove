import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import './index.scss';
import Page404 from './pages/error/404';
import Auth from './routes/Auth';
import RequireAuth from './routes/RequireAuth';
import { publicRoutes } from './routes';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<RequireAuth />}>
          {publicRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component} />
            );
          })}
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
export default App;
