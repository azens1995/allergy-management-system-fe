import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { STATUS } from '../constants/api';
import {
  addAllergy,
  updateAllergy,
  uploadImageById,
} from '../services/allergy.service';

export default function AllergyDetail() {
  const { state } = useLocation();
  const { actionType, id } = useParams();
  const isAdd = actionType === 'add';
  console.log(actionType);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    causes: '',
    symptoms: '',
    severity: '',
    preventions: '',
    treatments: '',
    isHighRisk: false,
    image: '',
  };

  if (!isAdd) {
    const {
      name,
      causes,
      symptoms,
      treatments,
      severity,
      isHighRisk,
      image,
      preventions,
    } = state;
    initialValues.name = name;
    initialValues.causes = causes;
    initialValues.symptoms = symptoms;
    initialValues.treatments = treatments;
    initialValues.severity = severity;
    initialValues.isHighRisk = isHighRisk;
    initialValues.preventions = preventions;
    initialValues.image = image;
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    causes: Yup.string().required('Causes is required'),
    symptoms: Yup.string().required('Symptoms is required'),
    severity: Yup.string().required('Severity is required'),
    treatments: Yup.string().required('Treatments is required'),
  });

  function navigateToHome() {
    navigate('/');
  }

  const createAllergy = async (allergy) => {
    const allergyToUpload = { ...allergy };
    allergyToUpload.image = null;
    const res = await addAllergy(allergyToUpload);
    if (res.status === STATUS.CREATED) {
      return res;
    } else {
      alert('Error while creating allergy');
    }
  };

  const editAllergy = async (allergy) => {
    const res = await updateAllergy(id, allergy);
    if (res.status === STATUS.SUCCESS) {
      return res;
    } else {
      alert('Error while updating allergy');
    }
  };

  const uploadImage = async (id, image) => {
    const res = await uploadImageById(id, image);
    if (res.status === STATUS.SUCCESS) {
      alert(res.data.message);
    }
  };

  const onSubmit = async (values, onSubmitProps) => {
    if (isAdd) {
      // Add allergy
      const res = await createAllergy(values);
      if (values.image && res.data.data.id) {
        await uploadImage(res.data.data.id, values.image);
      }
      navigateToHome();
    } else {
      // Update allergy
      const res = await editAllergy(values);
      if (values.image && res.data.data.id) {
        await uploadImage(res.data.data.id, values.image);
      }
      navigateToHome();
    }
    onSubmitProps.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field type='text' id='name' name='name'></Field>
              <ErrorMessage component='span' className='error' name='name' />
            </div>
            <div className='form-control'>
              <label htmlFor='causes'>Causes</label>
              <Field type='text' id='causes' name='causes'></Field>
              <ErrorMessage component='span' className='error' name='causes' />
            </div>
            <div className='form-control'>
              <label htmlFor='symptoms'>Symptoms</label>
              <Field type='text' id='symptoms' name='symptoms'></Field>
              <ErrorMessage
                component='span'
                className='error'
                name='symptoms'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='causes'>Severity</label>
              <Field type='text' id='severity' name='severity'></Field>
              <ErrorMessage
                component='span'
                className='error'
                name='severity'
              />
            </div>

            <div className='form-control'>
              <label htmlFor='preventions'>Preventions</label>
              <Field type='text' id='preventions' name='preventions'></Field>
              <ErrorMessage
                component='span'
                className='error'
                name='preventions'
              />
            </div>

            <div className='form-control'>
              <label htmlFor='causes'>Treatments</label>
              <Field type='text' id='treatments' name='treatments'></Field>
              <ErrorMessage
                component='span'
                className='error'
                name='treatments'
              />
            </div>

            <div className='form-control'>
              <div className='custom-checkbox'>
                <label htmlFor='isHighRisk'>Is High Risk?</label>
                <Field
                  type='checkbox'
                  id='isHighRisk'
                  name='isHighRisk'
                ></Field>
              </div>
              <ErrorMessage
                component='span'
                className='error'
                name='isHighRisk'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='image'>Upload Image</label>
              <input
                type='file'
                accept='image/*'
                id='image'
                name='image'
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
              ></input>
              {initialValues.image && (
                <img
                  src={initialValues.image}
                  alt='Image of the disease'
                  name='img'
                  height='200'
                  width='200'
                />
              )}
              <ErrorMessage component='span' className='error' name='image' />
            </div>
            <button
              className='btn-login'
              type='submit'
              disabled={!isValid && isSubmitting}
            >
              {isAdd ? 'Add' : 'Update'} Allergy
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
