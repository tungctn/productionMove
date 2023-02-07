import { createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SET_REQUEST_ADD,
  SET_REQUEST_BEGIN,
  SET_REQUEST_LIST,
} from '../action';
import { setAuthHeader } from '../api/auth';
import { createRequest, getAllRequest, searchRequest } from '../api/request';
import { RequestReducer } from '../reducers/RequestReducer';
import { useAppContext } from './AppContext';

export const RequestContext = createContext();

export const RequestContextProvider = (props) => {
  const {
    authState: { user },
    authState,
    gotoMainPage,
  } = useAppContext();
  const navigate = useNavigate();
  const { openNotification } = useAppContext();
  const [requestState, dispatch] = useReducer(RequestReducer, authState);
  const loadListRequest = async () => {
    dispatch({
      type: SET_REQUEST_BEGIN,
    });
    setAuthHeader(localStorage['token']);
    const response = await getAllRequest();
    if (response?.success) {
      dispatch({
        type: SET_REQUEST_LIST,
        payload: { listRequest: response?.data },
      });
    }
  };
  const handleCreateRequest = async (data) => {
    const response = await createRequest(data);
    if (response.success) {
      dispatch({
        type: SET_REQUEST_ADD,
        payload: {
          ...response.data,
        },
      });
      openNotification('success', response.msg);
      if (user.role !== 1) {
        navigate('/request');
      } else {
        gotoMainPage();
      }
    }
  };

  const handleSearchRequest = async (searchForm) => {
    if (Object.keys(searchForm).length !== 0) {
      dispatch({ type: SET_REQUEST_BEGIN });
      const response = await searchRequest(searchForm);
      if (response.success) {
        dispatch({
          type: SET_REQUEST_LIST,
          payload: { listRequest: response.data },
        });
      }
    }
  };

  const data = {
    requestState,
    loadListRequest,
    handleCreateRequest,
    handleSearchRequest,
  };
  return (
    <RequestContext.Provider value={data}>
      {props.children}
    </RequestContext.Provider>
  );
};

const useRequestContext = () => {
  return useContext(RequestContext);
};
export default RequestContextProvider;

export { useRequestContext };
