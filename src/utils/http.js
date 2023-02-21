import axios from 'axios';
import { API_BASE_URL, STATUS } from '../constants/api';
import { getAccessToken } from '../services/storage.service';
import { refreshToken } from '../services/auth.service';

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
    console.log('============');
    console.log(error);
    console.log('============');
    const config = error?.config;
    if (
      error?.response &&
      error?.response?.status === STATUS.UNAUTHORIZED &&
      !config._retry
    ) {
      console.log('Are we here??');
      config._retry = true;
      const result = await refreshToken();
      console.log('Ref res');
      console.log(result);
      const { accessToken } = result?.data?.data;
      console.log(`Access token ->${accessToken}`);
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return http(config);
    }
    return Promise.reject(error);
  }
);
