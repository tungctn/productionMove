import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import "./index.scss";
import Page403 from "./pages/error/403";
import { useAppContext } from "./contexts/AppContext";
import { useEffect } from "react";
import Auth from "./components/Auth/Auth";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

function App() {
  const {
    authState: { isLoading },
  } = useAppContext();

  const antIcon = <LoadingOutlined />;
  return (
    <Spin spinning={isLoading} indicator={antIcon}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/" element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/*" element={<Page403 />} />
        </Routes>
      </div>
     </Spin>
  );
}

export default App;
