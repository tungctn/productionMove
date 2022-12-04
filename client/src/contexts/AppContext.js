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
import { AuthReducer } from "../reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getProfile } from "../api/user";
import {
  SET_AUTH_BEGIN,
  SET_AUTH_FAILED,
  SET_AUTH_SUCCESS,
  SET_PRODUCTLINE_LIST,
} from "../action";
import { getAllProductLine } from "../api/productline";

export const AppContext = createContext();

export const initState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
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

  const convertObjectToArray = (obj) => {
    let result = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let index = 0; index < keys.length; index++) {
      const element = { propName: keys[index], value: values[index] };
      result.push(element);
    }
    return result;
  };

  const convertRoleToName = (role) => {
    switch (role) {
      case 1:
        return "Ban điều hành";
      case 2:
        return "Cơ sở sản xuất";
      case 3:
        return "Đại lý phân phối";
      case 4:
        return "Trung tâm bảo hành";
      default:
        throw new Error("Role is not match");
    }
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

  const handleLogout = async () => {
    dispatch({ type: SET_AUTH_BEGIN });
    const response = await logoutAPI();
    localStorage.removeItem("token");
    dispatch({ type: SET_AUTH_FAILED });
  };

  console.log(authState);

  const data = {
    authState,
    dispatch,
    openNotification,
    handleLogin,
    handleLogout,
    convertObjectToArray,
    convertRoleToName,
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
