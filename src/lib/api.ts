import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const zustandUser = JSON.parse(localStorage.getItem("user-storage") || "{}");
  const token = zustandUser.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default api;
