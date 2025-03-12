import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000/api/v1"
    // : "http://192.168.0.26:4000/api/v1");
    :"http://192.168.37.116:4000/api/v1");

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Ensures cookies are sent
});

// Automatically attach token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
