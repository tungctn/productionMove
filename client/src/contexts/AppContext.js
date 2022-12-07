import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { notification, Spin, Switch } from "antd";
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
import removeCookie from "../hooks/removeCookie";
import getCookie from "../hooks/getCookie";

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

  function refreshPage() {
    window.location.reload(false);
  }

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

  const convertTypeToName = (type) => {
    switch (type) {
      case 0:
        return "yêu cầu nhập sản phẩm";
      case 1:
        return "yêu cầu bảo hành";
      case 2:
        return "yêu cầu nhận sản phẩm đã bảo hành xong";
      case 3:
        return "yêu cầu trả lại sản phẩm do không bảo hành được";
      case 4:
        return "yêu cầu trả lại cơ sở sản xuất do lâu không bán được";
      default:
        throw new Error("type is not match");
    }
  };

  const convertStatusToName = (status) => {
    switch (status) {
      case 1:
        return "requested";
      case 2:
        return "pending";
      case 3:
        return "accept";
      case 4:
        return "reject";
      default:
        throw new Error("status is not match");
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
      refreshPage();
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
    await logoutAPI();
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
    refreshPage,
    convertTypeToName,
    convertStatusToName
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
