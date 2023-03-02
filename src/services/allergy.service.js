import { ALLERGY } from '../constants/api';
import { http } from '../utils/http';
import { ALLERGY_KEY } from '../constants/api';

export const getAllergy = async () => {
  return await http.get(ALLERGY);
};

export const getAllergyById = async (id) => {
  return await http.get(`${ALLERGY}/${id}`);
};

export const uploadImageById = async (id, image) => {
  const formData = new FormData();
  formData.append('photo', image);
  return await http.post(`${ALLERGY}/upload-image/${id}`, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
};

export const addAllergy = async (allergy) => {
  const {
    name,
    causes,
    symptoms,
    treatments,
    severity,
    isHighRisk,
    image,
    preventions,
  } = allergy;
  const formData = new FormData();
  formData.append(ALLERGY_KEY.NAME, name);
  formData.append(ALLERGY_KEY.CAUSES, causes);
  formData.append(ALLERGY_KEY.SYMPTOMS, symptoms);
  formData.append(ALLERGY_KEY.TREATMENTS, treatments);
  formData.append(ALLERGY_KEY.SEVERITY, severity);
  formData.append(ALLERGY_KEY.IS_HIGH_RISK, isHighRisk);
  formData.append(ALLERGY_KEY.PREVENTIONS, preventions);
  if (image) {
    formData.append(ALLERGY_KEY.PREVENTIONS, image);
  }
  return await http.post(ALLERGY, allergy, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
};

export const updateAllergy = async (id, allergy) => {
  const {
    name,
    causes,
    symptoms,
    treatments,
    severity,
    isHighRisk,
    image,
    preventions,
  } = allergy;
  const formData = new FormData();
  formData.append(ALLERGY_KEY.NAME, name);
  formData.append(ALLERGY_KEY.CAUSES, causes);
  formData.append(ALLERGY_KEY.SYMPTOMS, symptoms);
  formData.append(ALLERGY_KEY.TREATMENTS, treatments);
  formData.append(ALLERGY_KEY.SEVERITY, severity);
  formData.append(ALLERGY_KEY.IS_HIGH_RISK, isHighRisk);
  formData.append(ALLERGY_KEY.PREVENTIONS, preventions);
  if (image) {
    formData.append(ALLERGY_KEY.PREVENTIONS, image);
  }
  return await http.put(`${ALLERGY}/${id}`, formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
};

export const deleteAllergy = async (id) => {
  return await http.delete(`${ALLERGY}/${id}`);
};
