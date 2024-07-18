import axios from "axios";
import { getToken, removeToken } from "@/utils";
import { useNavigate } from "react-router-dom";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const navigate = useNavigate();
    if (error.response.status === 401) {
      removeToken();
      navigate("/login", { replace: true });
    }
    return Promise.reject(error);
  }
);

export default http;
