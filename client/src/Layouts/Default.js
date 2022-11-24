import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const Default = (props) => {
  return (
    <div className="grid grid-cols-6 grid-rows-12">
      <SideBar></SideBar>
      <div className="col-span-5 max-w-full max-h-screen">
      <Header></Header>
      <div className="bg-white mt-5 ml-5 rounded-md max-w-full" style={{ height: "calc(100vh - 84px)" }}>
       {props.children}
      </div>
      </div>
    </div>
  );
};

export default Default;
