import STORAGE from '../constants/storage.constant';

export const setUser = (user) => {
  localStorage.setItem(STORAGE.USER, user);
};

export const getUser = () => {
  return localStorage.getItem(STORAGE.USER);
};

export const setAccessToken = (token) => {
  localStorage.setItem(STORAGE.ACCESS_TOKEN, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE.ACCESS_TOKEN);
};

export const setRefreshToken = (token) => {
  localStorage.setItem(STORAGE.REFRESH_TOKEN, token);
};

export const getRefreshToken = () => {
  return localStorage.getItem(STORAGE.REFRESH_TOKEN);
};
