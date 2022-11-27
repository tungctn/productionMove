import axios from "./axios";

export const getAllProductLine = async () => {
  const response = await axios.get("/productline", {
    withCredentials: true,
  });
  return response.data;
};
