import axios from "./axios";

export const getAllProductLine = async () => {
  const response = await axios.get("/productline", {
    withCredentials: true,
  });
  return response.data;
};

export const getProductLine = async (id) => {
  const response = await axios.get(`/productline/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProductLine = async (id, data) => {
  const response = await axios.put(`/productline/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteProductLine = async (id) => {
  const response = await axios.delete(`/productline/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
