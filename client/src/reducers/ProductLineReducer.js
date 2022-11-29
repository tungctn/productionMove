import React from "react";
import { SET_PRODUCTLINE_INFO, SET_PRODUCTLINE_LIST } from "../action";
import { initState } from "../contexts/AppContext";

export const ProductLineReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTLINE_LIST:
      return {
        ...state,
        listProductLine: action.payload.listProductLine,
      };
    default:
      throw new Error("Action not match");
  }
};
