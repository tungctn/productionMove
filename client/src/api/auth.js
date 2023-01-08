import removeCookie from '../hooks/removeCookie';
import setCookie from '../hooks/setCookie';
import axios from './axios';

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setCookie('accessToken', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    removeCookie('accessToken');
  }
};

export const loginAPI = async (data) => {
  const response = await axios.post('/auth/login', data);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axios.post('/auth/logout');
  return response.data;
};
