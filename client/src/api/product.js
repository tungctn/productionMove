import axios from "./axios";

export const updateProduct = async (data, id) => {
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
  const response = await axios.get("/product", { withCredentials: true });
  return response.data;
};
