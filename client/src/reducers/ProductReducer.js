import {SET_PRODUCT_LIST } from "../action";

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        listProduct: action.payload.listProduct,
      };
    default:
      throw new Error("Action not match");
  }
};
