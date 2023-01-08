import axios from "axios";

export default axios.create({
  baseURL: "https://plm-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
