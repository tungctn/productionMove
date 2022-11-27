import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { notification, Spin } from "antd";
import { loginAPI, logoutAPI, setAuthHeader } from "../api/auth";
import { AuthReducer } from "./Reducer";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getProfile } from "../api/user";
import {
  SET_AUTH_BEGIN,
  SET_AUTH_FAILED,
  SET_AUTH_SUCCESS,
  SET_PRODUCTLINE_LIST,
} from "./action";
import { getAllProductLine } from "../api/productline";

export const AppContext = createContext();

export const initState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  listUser: [],
  listProductLine: [],
};

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(AuthReducer, initState);
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 2.5,
    });
  };

  const loadUser = async () => {
    console.log("load user");
    if (!localStorage["token"]) {
      dispatch({ type: SET_AUTH_FAILED });
      return;
    }
    dispatch({ type: SET_AUTH_BEGIN });
    setAuthHeader(localStorage["token"]);
    const response = await getProfile();
    console.log(response.data);
    if (response.success) {
      dispatch({
        type: SET_AUTH_SUCCESS,
        payload: {
          user: response.data,
        },
      });
    } else {
      localStorage.removeItem("token");
      setAuthHeader(null);
      dispatch({ type: SET_AUTH_FAILED });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogin = async (data) => {
    dispatch({
      type: SET_AUTH_BEGIN,
    });
    const response = await loginAPI(data);
    if (response.success) {
      console.log(response);
      localStorage.setItem("token", response.accessToken);
      setAuthHeader(localStorage["token"]);
      dispatch({
        type: SET_AUTH_SUCCESS,
        payload: {
          user: response.data,
        },
      });
      openNotification("success", "Login success");
      console.log(localStorage);
    } else {
      console.log(response.msg);
      dispatch({
        type: SET_AUTH_FAILED,
      });
      openNotification("error", "Login failed");
    }
  };

  const handleProfile = async () => {
    setAuthHeader(localStorage["token"]);
    console.log(axios.defaults);
    const response = await getProfile();
    if (response.success) {
      console.log(response.data);
    }
  };

  const handleLogout = async () => {
    dispatch({ type: SET_AUTH_BEGIN });
    const response = await logoutAPI();
    localStorage.removeItem("token");
    dispatch({ type: SET_AUTH_FAILED });
  };

  const loadProductLine = async () => {
    const response = await getAllProductLine();
    console.log(response.data);
    if (response.success) {
      dispatch({
        type: SET_PRODUCTLINE_LIST,
        payload: { listProductLine: response.data },
      });
    }
  };

  useEffect(() => {
    loadProductLine();
    console.log("productline");
  }, []);

  console.log(authState);

  const data = {
    authState,
    dispatch,
    openNotification,
    handleLogin,
    handleProfile,
    handleLogout,
  };

  return (
    <AppContext.Provider value={data}>{props.children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;

export { useAppContext };
