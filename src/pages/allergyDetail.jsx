import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { STATUS } from '../constants/api';
import { addAllergy, updateAllergy } from '../services/allergy.service';

export default function AllergyDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const isAdd = !id;
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

  if (id) {
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

  const createAllergy = async (allergy) => {
    const res = await addAllergy(allergy);
    if (res.status === STATUS.CREATED) {
      alert(res.data.message);
      navigate('/');
    } else {
      alert('Error while creating allergy');
      console.log(res.data.message);
    }
  };

  const editAllergy = async (allergy) => {
    const res = await updateAllergy(id, allergy);
    if (res.status === STATUS.SUCCESS) {
      alert(res.data.message);
      navigate('/');
    } else {
      alert('Error while creating allergy');
      console.log(res.data.message);
    }
  };

  const onSubmit = async (values, onSubmitProps) => {
    // Handle Login and process errors
    if (isAdd) {
      // Add allergy
      createAllergy(values);
    } else {
      // Update allergy
      editAllergy(values);
    }
    onSubmitProps.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, isSubmitting }) => {
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field type='text' id='name' name='name'></Field>
              <ErrorMessage name='name' />
            </div>
            <div className='form-control'>
              <label htmlFor='causes'>Causes</label>
              <Field type='text' id='causes' name='causes'></Field>
              <ErrorMessage name='causes' />
            </div>
            <div className='form-control'>
              <label htmlFor='symptoms'>Symptoms</label>
              <Field type='text' id='symptoms' name='symptoms'></Field>
              <ErrorMessage name='symptoms' />
            </div>
            <div className='form-control'>
              <label htmlFor='causes'>Severity</label>
              <Field type='text' id='severity' name='severity'></Field>
              <ErrorMessage name='severity' />
            </div>

            <div className='form-control'>
              <label htmlFor='preventions'>Preventions</label>
              <Field type='text' id='preventions' name='preventions'></Field>
              <ErrorMessage name='preventions' />
            </div>

            <div className='form-control'>
              <label htmlFor='causes'>Treatments</label>
              <Field type='text' id='treatments' name='treatments'></Field>
              <ErrorMessage name='treatments' />
            </div>

            <div className='form-control'>
              <label htmlFor='isHighRisk'>Is High Risk?</label>
              <Field type='checkbox' id='isHighRisk' name='isHighRisk'></Field>
              <ErrorMessage name='isHighRisk' />
            </div>
            <button type='submit' disabled={!isValid && isSubmitting}>
              {isAdd ? 'Add' : 'Update'} Allergy
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
