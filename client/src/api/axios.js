import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8001/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});
