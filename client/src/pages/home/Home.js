import React, { useContext, useEffect } from "react";
import App from "../../App";
import { AppContext } from "../../context/AppContext";
import Default from "../../Layouts/Default";
import "./index.css";

const Home = () => {
  const {authState} = useContext(AppContext)
  useEffect(() => {
    console.log(authState)
  },[])

  return (
    <div>
      <Default>Home
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
        <div>ome</div>
      </Default>
    </div>
  );
};

export default Home;
