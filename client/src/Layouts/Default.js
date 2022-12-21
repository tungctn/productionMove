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
      <SideBar open={open} tag={props.tagName} onClick={handleClick} />
      <div className={`basis-${open ? "5/6" : "11/12"} h-full`}>
        <Header />
        <div className="bg-white mt-3 ml-3 rounded-md h-[calc(100%-16px)] min-[560px]:h-[calc(100%-20px)] min-[720px]:h-[calc(100%-60px)] overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Default;
