import axios from "./axios";

export const getProfile = async () => {
  const response = await axios.get("/user/profile", {
    withCredentials: true,
  });
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`/user/${id}`, { withCredentials: true });
  return response.data;
};

export const getListUser = async () => {
  const response = await axios.get("/user", { withCredentials: true });
  return response.data;
};

export const createUser = async (data) => {
  const response = await axios.post("/user", data, { withCredentials: true });
  return response.data;
};

export const updateUser = async (data, id) => {
  const response = await axios.put(`/user/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/user/${id}`, { withCredentials: true });
  return response.data;
};
