import axios from './axios';

export const getAllProductLine = async () => {
  const response = await axios.get('/productline');
  return response.data;
};

export const createProductLine = async (data) => {
  const response = await axios.post('/productline', data);
  return response.data;
};

export const getProductLine = async (id) => {
  const response = await axios.get(`/productline/${id}`);
  return response.data;
};

export const updateProductLine = async (id, data) => {
  const response = await axios.put(`/productline/${id}`, data);
  return response.data;
};

export const deleteProductLine = async (id) => {
  const response = await axios.delete(`/productline/${id}`);
  return response.data;
};

export const searchProductLine = async (data) => {
  const response = await axios.post('/productline/search', data);
  return response.data;
};
