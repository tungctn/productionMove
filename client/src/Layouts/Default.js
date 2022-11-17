import React from "react";
import Navbar from "../components/Navbar/Navbar";

const Default = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default Default;
