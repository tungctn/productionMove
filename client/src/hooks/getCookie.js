import Cookie from "js-cookie";
import React from "react";

const getCookie = (cookiename) => {
  return Cookie.get(cookiename);
};

export default getCookie;
