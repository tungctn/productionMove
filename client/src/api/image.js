import axios from "./axios";

export const uploadImage = async (data) => {
  const response = await axios.post("/image/upload", data);
  return response.data;
};
