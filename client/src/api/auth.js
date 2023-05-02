import axios from './axios';

export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
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
