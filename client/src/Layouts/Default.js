import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

function Default(props) {
  console.log(props);
  const [open, setOpen] = useState(true);
  const handleClick = () => {
   setOpen(!open);
  };
  return (
    <div className="flex flex-row h-screen w-full">
      <SideBar open={open} tag={props.tagName} childrenTag={props.childrenName} onClick={handleClick} />
      {
        open && 
        <div className="basis-5/6">
          <Header />
          <div className="w-full bg-white mt-5 ml-5 rounded-md h-[calc(100%-90px)] overflow-y-scroll">
            {props.children}
          </div>
        </div>
      }
      {
        !open && 
        <div className="basis-11/12">
          <Header />
          <div className="w-full bg-white mt-5 ml-5 rounded-md h-[calc(100%-90px)] overflow-y-scroll">
            {props.children}
          </div>
        </div>
      }
    </div>
  );
}

export default Default;
