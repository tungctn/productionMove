import axios from "axios";

export default axios.create({
  baseURL: "https://plm-750g.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
