import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import './index.scss';
import Page404 from './pages/error/404';
import Auth from './routes/Auth';
import RequireAuth from './routes/RequireAuth';
import { publicRoutes } from './routes';
import ReactMapGl from 'react-map-gl';
import { useState } from 'react';

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
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
      {/* <ReactMapGl
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
      /> */}
    </div>
  );
};
export default App;
