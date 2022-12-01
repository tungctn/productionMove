import removeCookie from "../hooks/removeCookie";
import setCookie from "../hooks/setCookie";
import axios from "./axios";

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCookie("accessToken", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    removeCookie("accessToken");
  }
};

export const loginAPI = async (data) => {
  try {
    const response = await axios.post("/auth/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axios.post("/auth/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
