import { setAuthHeader } from "./auth";
import axios from "./axios";

export const updateProduct = async (id, data) => {
  const response = await axios.put(`/product/${id}`, data);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post(`/product/`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllProduct = async () => {
  const response = await axios.get("/product");
  return response.data;
};

export const getProductByUser = async () => {
  const response = await axios.get("/product/user");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`/product/${id}`);
  return response.data;
};

