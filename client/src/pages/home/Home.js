import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import App from "../../App";
import { AppContext, useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";
import "./index.css";

const Home = () => {
  const {
    handleProfile,
    authState: { user },
    authState,
  } = useAppContext();
  useEffect(() => {
    console.log(user);
    // console.log(authState);
  }, []);

  return (
    <div>
      <Default>
        <div>Home</div>
      </Default>
      <Button onClick={handleProfile}>Get User</Button>
    </div>
  );
};

export default Home;
