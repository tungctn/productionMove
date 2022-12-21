import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SET_REQUEST_ADD, SET_REQUEST_LIST } from "../action";
import { createRequest, getAllRequest } from "../api/request";
import { RequestReducer } from "../reducers/RequestReducer";
import { useAppContext } from "./AppContext";
import { setAuthHeader } from '../api/auth';

export const RequestContext = createContext();

export const initState = {
  listRequest: [],
};

export const RequestContextProvider = (props) => {
  const { authState } = useAppContext();
  const navigate = useNavigate();
  const { openNotification } = useAppContext();
  const [requestState, dispatch] = useReducer(RequestReducer, authState);
  const loadListRequest = async () => {
    setAuthHeader(localStorage['token'])
    const response = await getAllRequest();
    if (response.success) {
      dispatch({
        type: SET_REQUEST_LIST,
        payload: { listRequest: response.data },
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
      openNotification("success", response.msg);
      navigate("/request");
    } else {
      openNotification("error", response.msg);
    }
  };
  useEffect(() => {
    loadListRequest();
  }, []);

  console.log(requestState);

  const data = {
    requestState,
    dispatch,
    loadListRequest,
    handleCreateRequest,
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
