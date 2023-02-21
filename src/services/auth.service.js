import { http } from '../utils/http';
import * as storageService from './storage.service';
import { LOGIN, REFRESH_TOKEN, REGISTER, USER } from '../constants/api';

export const register = async (firstName, lastName, email, password) => {
  return await http.post(USER + REGISTER, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = async (email, password) => {
  return await http.post(USER + LOGIN, {
    email,
    password,
  });
};

export const refreshToken = async () => {
  return await http.post(USER + REFRESH_TOKEN, {
    refreshToken: storageService.getRefreshToken(),
  });
};
