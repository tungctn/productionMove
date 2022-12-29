import { BackTop, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import Header from "./Header";
import SideBar from "./SideBar";

const Default = (props) => {
  const { openSidebar, setOpenSidebar } = useAppContext();
  const handleClick = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className="flex flex-row h-screen w-full">
      <SideBar
        open={openSidebar}
        tag={props.tagName}
        childrenTag={props.childrenName}
        onClick={handleClick}
      />
      <div className={`${openSidebar ? "basis-5/6" : "basis-11/12"} h-full`}>
        <Header />
        <div className="bg-white mt-2 ml-3 rounded-xl h-[calc(100%-75px)] overflow-y-scroll">
          {props.children}
        </div>
        <BackTop />
      </div>
    </div>
  );
};

export default Default;
