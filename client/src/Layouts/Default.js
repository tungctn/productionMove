import { Col, Row } from "antd";
import React, { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import "antd/dist/antd.css";
import { useAppContext } from "../contexts/AppContext";

const Default = (props) => {

  return (
    <div className="grid grid-cols-6 grid-rows-12">
      <SideBar />
      <div className="col-span-5 max-w-screen max-h-screen">
        <Header />
        <div
          className="bg-white mt-5 ml-5 rounded-md max-w-full"
          style={{ height: "calc(100vh - 84px)" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Default;
