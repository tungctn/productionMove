import { SET_USER_LIST } from "../action";

export const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        listUser: action.payload.listUser,
      };

    default:
      throw new Error("Action not match");
  }
};
