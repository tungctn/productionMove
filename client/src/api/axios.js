import axios from "axios";

export default axios.create({
  // baseURL: "https://plm-api.onrender.com/api",
  baseURL: "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
