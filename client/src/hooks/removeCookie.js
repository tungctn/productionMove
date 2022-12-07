import React from "react";
import Cookie from "js-cookie";

const removeCookie = (cookiename) => {
  Cookie.remove(cookiename);
};

export default removeCookie;
