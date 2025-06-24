import { useEffect } from 'react';
import axios from 'axios';

export default function useAuthInterceptor(token, onUnauthorized) {
  useEffect(() => {
    if (!token) return;

    const requestInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      null,
      (error) => {
        if (error.response?.status === 401) {
          onUnauthorized();
        }
        return error;
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, onUnauthorized]);
}
