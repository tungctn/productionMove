import { SET_PRODUCTLINE_BEGIN, SET_PRODUCTLINE_LIST } from "../action";

export const ProductLineReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTLINE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SET_PRODUCTLINE_LIST:
      return {
        ...state,
        isLoading: false, 
        listProductLine: action.payload.listProductLine,
      };
    default:
      throw new Error("Action not match");
  }
};
