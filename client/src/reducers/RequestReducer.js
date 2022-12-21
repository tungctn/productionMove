import React from "react";
import { SET_REQUEST_ADD, SET_REQUEST_FAILED, SET_REQUEST_LIST } from "../action";
import { initState } from "../contexts/AppContext";

export const RequestReducer = (state, action) => {
  switch (action.type) {
    case SET_REQUEST_LIST:
      return {
        ...state,
        listRequest: action.payload.listRequest,
      };
    case SET_REQUEST_ADD:
      return {
        ...state,
        listRequest: [...state.listRequest, { ...action.payload }],
      };
    case SET_REQUEST_FAILED:
      return {
        ...initState,
      };

    default:
      throw new Error("Action not match");
  }
  
};
