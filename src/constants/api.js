export const API_BASE_URL = 'http://localhost:3001/api';
export const USER = '/user';
export const ALLERGY = '/allergy';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const REFRESH_TOKEN = '/refreshToken';

export const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
};

export const ALLERGY_KEY = {
  NAME: 'name',
  CAUSES: 'causes',
  SYMPTOMS: 'symptoms',
  SEVERITY: 'severity',
  PREVENTIONS: 'preventions',
  TREATMENTS: 'treatments',
  IS_HIGH_RISK: 'isHighRisk',
  IMAGE: 'image',
};
