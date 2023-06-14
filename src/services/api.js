import axios from 'axios'
import { getToken } from "./auth";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL + '/api' || 'http://localhost:3001',
// })

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

