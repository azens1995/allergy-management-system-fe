import * as Yup from 'yup';
import { STATUS } from '../constants/api';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.service';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required!'),
    lastName: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().required('Required!'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    const { firstName, lastName, email, password } = values;
    const res = await register(firstName, lastName, email, password);
    if (res.status === STATUS.CREATED) {
      alert(res.data.message);
      navigate('/login');
    } else {
      alert(res.data.message);
    }
    // Enable the submit button
    onSubmitProps.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  });

  return (
    <div className='container'>
      <h2 className='title'>Register to Allergy Management System</h2>
      <hr></hr>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <div className='form-control'>
                <label htmlFor='firstName'>First Name</label>
                <Field type='text' id='firstName' name='firstName'></Field>
                <ErrorMessage className='error' name='firstName' />
              </div>

              <div className='form-control'>
                <label htmlFor='lastName'>Last Name</label>
                <Field type='text' id='lastName' name='lastName'></Field>
                <ErrorMessage className='error' name='lastName' />
              </div>
              <div className='form-control'>
                <label htmlFor='email'>Email</label>
                <Field type='text' id='email' name='email'></Field>
                <ErrorMessage component='div' className='error' name='email' />
              </div>

              <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <Field type='text' id='password' name='password'></Field>
                <ErrorMessage
                  component='div'
                  className='error'
                  name='password'
                />
              </div>

              <button
                type='submit'
                className='submit btn-positive'
                disabled={!formik.isValid && formik.isSubmitting}
              >
                Register
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
