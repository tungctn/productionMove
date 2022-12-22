import {
  SET_AUTH_BEGIN,
  SET_AUTH_FAILED,
  SET_AUTH_SUCCESS,
  SET_USER_LIST,
} from "../action";
import { initState } from "../contexts/AppContext";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SET_AUTH_FAILED:
      return {
        ...initState,
      };
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        ...action.payload,
      };
    case SET_USER_LIST:
      return {
        ...state,
        listUser: action.payload.users,
      };
    
    default:
      throw new Error("Action not match");
  }
};
