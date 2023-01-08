import {
  SET_REQUEST_ADD,
  SET_REQUEST_BEGIN,
  SET_REQUEST_LIST,
} from "../action";

export const RequestReducer = (state, action) => {
  switch (action.type) {
    case SET_REQUEST_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SET_REQUEST_LIST:
      return {
        ...state,
        listRequest: action.payload.listRequest,
        isLoading: false,
      };
    case SET_REQUEST_ADD:
      return {
        ...state,
        listRequest: [...state.listRequest, { ...action.payload }],
      };
    default:
      throw new Error("Action not match");
  }
};
