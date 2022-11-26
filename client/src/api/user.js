import axios from "./axios";

export const getProfile = async () => {
  try {
    const response = await axios.get("/auth/profile", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
