import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createUser, deleteUser, getListUser, updateUser } from "../api/user";
import {
  SET_USER_ADD,
  SET_USER_BEGIN,
  SET_USER_DELETE,
  SET_USER_LIST,
  SET_USER_UPDATE,
} from "../action";
import { UserReducer } from "../reducers/UserReducer";
import { useAppContext } from "./AppContext";

export const UserContext = createContext();

export const initState = {
  listUser: [],
};

const UserContextProvider = (props) => {
  const { authState } = useAppContext();
  const [userState, dispatch] = useReducer(UserReducer, authState);
  const { convertObjectToArray, openNotification } = useAppContext();

  const loadListUser = async () => {
    dispatch({ type: SET_USER_BEGIN });
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

  const handleAddUser = async (createForm) => {
    const response = await createUser(createForm);
    if (response.success) {
      openNotification("success", response.msg);
      // const newList = userState.listUser.push(createForm);
      dispatch({
        type: SET_USER_ADD,
        payload: {
          ...response.data,
        },
      });
      console.log(userState);
    } else {
      openNotification("error", "Failed");
    }
  };

  const handleEditUser = async (editForm, id) => {
    const response = await updateUser(convertObjectToArray(editForm), id);
    if (response.success) {
      openNotification("success", response.msg);
      dispatch({
        type: SET_USER_UPDATE,
        payload: {
          ...editForm,
          id: id,
        },
      });
    } else {
      openNotification("error", "Failed");
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);
    if (response.success) {
      openNotification("success", response.msg);
      dispatch({
        type: SET_USER_DELETE,
        payload: {
          id: id,
        },
      });
    } else {
      openNotification("error", "Failed");
    }
  };

  const data = {
    userState,
    dispatch,
    loadListUser,
    handleEditUser,
    handleDeleteUser,
    handleAddUser,
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
