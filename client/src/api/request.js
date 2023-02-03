import axios from "./axios";

export const createRequest = async (data) => {
  const response = await axios.post("/request", data);
  return response.data;
};

export const getAllRequest = async () => {
  const response = await axios.get("/request");
  return response.data;
};

export const handleImportRequest = async (data) => {
  const response = await axios.put("/request/handleImportRequest", data);
  return response.data;
};

export const updateRequest = async (id, data) => {
  const response = await axios.put(`/request/${id}`, data);
  return response.data;
};

export const searchRequest = async (data) => {
  const response = await axios.post("/request/search", data);
  return response.data;
};
