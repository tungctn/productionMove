import { SET_PRODUCT_BEGIN, SET_PRODUCT_LIST } from "../action";

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        isLoading: false,
        listProduct: action.payload.listProduct,
      };
    default:
      throw new Error("Action not match");
  }
};
