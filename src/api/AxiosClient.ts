import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cross-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = secureLocalStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const resp = await fetch(`/api/v1/auth/reissue`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Cross-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        secureLocalStorage.setItem('accessToken', data.accessToken);
        secureLocalStorage.setItem('refreshToken', data.refreshToken);
        return axiosClient(originalRequest);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
)