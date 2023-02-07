import { createContext, useContext, useReducer } from 'react';
import { createUser, deleteUser, getListUser, searchUser, updateUser } from '../api/user';
import { SET_USER_ADD, SET_USER_BEGIN, SET_USER_DELETE, SET_USER_LIST, SET_USER_UPDATE } from '../action';
import { UserReducer } from '../reducers/UserReducer';
import { useAppContext } from './AppContext';

export const UserContext = createContext();


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

  const handleSearchUser = async (searchForm) => {
    dispatch({ type: SET_USER_BEGIN });
    const response = await searchUser(searchForm);
    if (response.success) {
      dispatch({
        type: SET_USER_LIST,
        payload: {
          listUser: response.data,
        },
      });
    }
  };

  const handleAddUser = async (createForm) => {
    const response = await createUser(createForm);
    if (response.success) {
      openNotification('success', response.msg);
      dispatch({
        type: SET_USER_ADD,
        payload: {
          ...response.data,
        },
      });
    } else {
      openNotification('error', response.msg);
    }
  };

  const handleEditUser = async (editForm, id) => {
    const response = await updateUser(convertObjectToArray(editForm), id);
    if (response.success) {
      openNotification('success', response.msg);
      dispatch({
        type: SET_USER_UPDATE,
        payload: {
          ...editForm,
          id: id,
        },
      });
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);
    if (response.success) {
      openNotification('success', response.msg);
      dispatch({
        type: SET_USER_DELETE,
        payload: {
          id: id,
        },
      });
    }
  };

  const data = {
    userState,
    loadListUser,
    handleEditUser,
    handleDeleteUser,
    handleAddUser,
    handleSearchUser,
  };

  return <UserContext.Provider value={data}>{props.children}</UserContext.Provider>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContextProvider;

export { useUserContext };
