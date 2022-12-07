import axios from "./axios";

export const createRequest = async (data) => {
  const response = await axios.post("/request", data);
  return response.data;
};

export const getAllRequest = async () => {
  const response = await axios.get("/request");
  return response.data;
};
