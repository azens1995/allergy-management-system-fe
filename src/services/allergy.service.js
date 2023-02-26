import { ALLERGY } from '../constants/api';
import { http } from '../utils/http';

export const getAllergy = async () => {
  return await http.get(ALLERGY);
};

export const getAllergyById = async (id) => {
  return await http.get(ALLERGY + '/' + id);
};

export const uploadImageById = async (id, image) => {
  const formData = new FormData();
  formData.append('photo', image);
  return await http.post(ALLERGY + '/upload/' + id, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
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
