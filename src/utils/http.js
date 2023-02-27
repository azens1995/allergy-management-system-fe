import axios from 'axios';
import { API_BASE_URL, STATUS } from '../constants/api';
import { refreshToken } from '../services/auth.service';
import {
  getAccessToken,
  removeToken,
  setAccessToken,
  setRefreshToken,
} from '../services/storage.service';

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use Authorization token if available in each request
http.interceptors.request.use((req) => {
  // check if access token is available
  if (getAccessToken()) {
    req.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  }
  return req;
});

// Refresh the token if the authorization token is expired
http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const config = error?.config;
    if (
      error?.response &&
      error?.response?.status === STATUS.UNAUTHORIZED &&
      !config._retry
    ) {
      config._retry = true;
      const result = await refreshToken();
      if (result.status === STATUS.SUCCESS) {
        const { accessToken, refreshToken } = result?.data?.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        if (accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
        }
        return http(config);
      }
      // Remove Access and Refresh token
      removeToken();
      return Promise.reject(error);
    }
    removeToken();
    return Promise.reject(error);
  }
);
