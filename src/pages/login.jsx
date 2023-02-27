import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { STATUS } from '../constants/api';
import { login } from '../services/auth.service';
import { setAccessToken, setRefreshToken } from '../services/storage.service';
import './login.css';

export const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    // Handle Login and process errors
    const { email, password } = values;
    const res = await login(email, password);
    if (res.status === STATUS.SUCCESS) {
      const { accessToken, refreshToken } = res.data.data;
      // Save access and refresh token to localstorage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate('/');
    }

    if (res.status === STATUS.BAD_REQUEST) {
      // TODO: Display Error dialog
    }

    // Enable the submit button
    onSubmitProps.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <section className='login-page-wrapper'>
            <h3>Login</h3>
            <Form className='login-page'>
              <div className='form-control'>
                <label htmlFor='email'>Email</label>
                <Field type='text' id='email' name='email'></Field>
                <ErrorMessage component='span' className='error' name='email' />
              </div>
              <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <Field type='text' id='password' name='password'></Field>
                <ErrorMessage
                  component='span'
                  className='error'
                  name='password'
                />
              </div>

              <button
                type='submit'
                className='btn-login'
                disabled={!formik.isValid && formik.isSubmitting}
              >
                Login
              </button>
            </Form>
            <p>OR</p>
            <button
              onClick={() => navigate('/register')}
              className='btn-login btn-signup'
            >
              Register
            </button>
          </section>
        );
      }}
    </Formik>
  );
};
