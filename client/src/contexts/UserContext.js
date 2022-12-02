import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getListUser } from "../api/user";
import { SET_USER_LIST } from "../action";
import { UserReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

export const initState = {
  listUser: [],
};

const UserContextProvider = (props) => {
  const [userState, dispatch] = useReducer(UserReducer, initState);

  const loadListUser = async () => {
    const response = await getListUser();
    if (response.success) {
      dispatch({
        type: SET_USER_LIST,
        payload: {
          listUser: response.data,
        },
      });
    }
  };

  useEffect(() => {
    loadListUser();
  }, []);

  const data = {
    userState,
    dispatch,
    loadListUser
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;

export { useUserContext };
