import axios from "./axios";

export const uploadImage = async (data) => {
  const res = await axios.post("/image/upload", data);
  return res.data;
};
