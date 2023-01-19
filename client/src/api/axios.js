import axios from 'axios';

export default axios.create({
  // baseURL: "https://plm-api.onrender.com/api",
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
