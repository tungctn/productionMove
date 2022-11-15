import { createContext, useReducer } from "react";
import { notification } from "antd";
import { loginAPI } from "../api/auth";
import { AuthReducer } from "./Reducer";

export const AppContext = createContext();

export const initState = {};

const AppContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, initState);
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 2.5,
    });
  };

  const handleLogin = async (data) => {
    const response = await loginAPI(data);
    if (response) {
      console.log(response);
      // console.log(response.token);
    } else {
      console.log(response.error);
    }
  };

  const data = {
    authState,
    dispatch,
    openNotification,
    handleLogin,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
