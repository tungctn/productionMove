import {
  SET_USER_ADD,
  SET_USER_BEGIN,
  SET_USER_DELETE,
  SET_USER_LIST,
  SET_USER_UPDATE,
} from "../action";

export const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SET_USER_LIST:
      return {
        ...state,
        listUser: action.payload.listUser,
        isLoading: false,
      };
    case SET_USER_ADD:
      return {
        ...state,
        listUser: [...state.listUser, { ...action.payload }],
      };
    case SET_USER_UPDATE:
      return {
        ...state,
        listUser: state.listUser.map((item) => {
          if (item._id === action.payload.id) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    case SET_USER_DELETE:
      return {
        ...state,
        listUser: state.listUser.filter(
          (item) => item._id !== action.payload.id
        ),
      };
    default:
      throw new Error("Action not match");
  }
};
