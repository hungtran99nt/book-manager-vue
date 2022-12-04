import { useUserStore } from '@/stores/user';
import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:8080',
});

export const HTTPS = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

HTTPS.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const userStore = useUserStore();
      const token = userStore.getToken;
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
