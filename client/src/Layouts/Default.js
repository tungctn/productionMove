import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const Default = (props) => {
  return (
    <div className="flex flex-row h-screen">
      <SideBar></SideBar>
      <div className="basis-5/6 h-screen">
        <Header></Header>
        <div className="bg-white mt-5 ml-5 rounded-md h-[calc(100%-64px)] overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Default;
