import axios from "./axios";

export const loginAPI = async (data) => {
  try {
    const response = await axios.post("/login", data);
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
