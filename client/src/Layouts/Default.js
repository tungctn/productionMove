import { Col, Row } from "antd";
import React, { useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import "antd/dist/antd.css";
import { useAppContext } from "../contexts/AppContext";

function Default(props) {
  console.log(props);

  return (
    <div className="flex flex-row h-screen w-full">
      <SideBar tag={props.tagName}></SideBar>
      <div className="basis-5/6 h-full">
        <Header />
        <div className="bg-white mt-5 ml-5 rounded-md h-[calc(100%-90px)] overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Default;
