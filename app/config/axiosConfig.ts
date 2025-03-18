import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://203.145.47.225:9090",
  baseURL: "https://9410-203-145-47-225.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
