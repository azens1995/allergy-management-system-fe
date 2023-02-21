import { ALLERGY, API_BASE_URL } from '../constants/api';
import { http } from '../utils/http';

const ALLERGY_API_URL = API_BASE_URL + ALLERGY;

export const getAllergy = async () => {
  return await http.get(ALLERGY);
};

export const getAllergyById = async (id) => {
  return await http.get(ALLERGY + '/' + id);
};

export const addAllergy = async (allergy) => {
  return await http.post(ALLERGY, allergy);
};

export const updateAllergy = async (id, allergy) => {
  return await http.put(ALLERGY + '/' + id, allergy);
};

export const deleteAllergy = async (id) => {
  return await http.delete(`${ALLERGY}/${id}`);
};
