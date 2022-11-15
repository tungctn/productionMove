import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});
