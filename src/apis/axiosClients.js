import axios from "axios";
import Cookies from "js-cookie";
const axiosClients = axios.create({
  baseURL: "http://14.225.255.72:8080/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosClients.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {}
);

export default axiosClients;
