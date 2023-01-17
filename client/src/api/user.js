import axios from './axios';

export const getProfile = async () => {
  const response = await axios.get('/user/profile');
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`/user/${id}`);
  return response.data;
};

export const getListUser = async () => {
  const response = await axios.get('/user');
  return response.data;
};

export const createUser = async (data) => {
  const response = await axios.post('/user', data);
  return response.data;
};

export const updateUser = async (data, id) => {
  const response = await axios.put(`/user/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/user/${id}`);
  return response.data;
};

export const searchUser = async (data) => {
  const response = await axios.post('/user/search', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axios.post('/user/changePassword', data);
  return response.data;
};

export const checkPassword = async (data) => {
  const response = await axios.post('/user/checkPassword', data);
  return response.data;
};

export const checkEmail = async (data) => {
  const response = await axios.post('/user/checkEmail', data);
  return response.data;
};
