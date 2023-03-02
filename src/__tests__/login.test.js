import React from 'react';
import { Login } from '../pages/login';
import { STATUS } from '../constants/api';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import * as authService from '../services/auth.service';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

jest.mock('../services/auth.service.js');

const loginResponse = {
  status: STATUS.SUCCESS,
  data: {
    accessToken: 'fafkahfakhfka.afafhafka.afafa',
    refreshToken: 'fafafa.fafafafa.fafafafa',
  },
  message: 'Logged in successfully',
};

const apiResponse = {
  status: STATUS.SUCCESS,
  data: loginResponse,
};

const emailText = 'sample@sample.com';
const passwodText = 'samplePassword';

const mockLoginUser = jest.spyOn(authService, 'login');
mockLoginUser.mockResolvedValue(apiResponse);

describe('Login Page', () => {
  const emailErrorText = 'Email is required';
  const passwordErrorText = 'Password is required';

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render login page correctly', () => {
    const element = screen.getByRole('heading');
    expect(element).toBeInTheDocument();
  });

  it('should not show error message when the login page is rendered', () => {
    const emailErrorElement = screen.queryByText(emailErrorText);
    const passwordErrorElement = screen.queryByText(passwordErrorText);
    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
  });

  it('should show error message when all the fields are not entered', async () => {
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeEnabled();
    await act(async () => {
      await fireEvent.click(loginButton);
    });
    const emailErrorElement = screen.getByText(emailErrorText);
    const passwordErrorElement = screen.getByText(passwordErrorText);
    expect(emailErrorElement).toBeInTheDocument();
    expect(passwordErrorElement).toBeInTheDocument();
  });

  it('should not show error message after clicking login when all fields are entered', async () => {
    const emailElement = await screen.getByRole('textbox', { name: /email/i });
    const passwordElement = await screen.getByRole('textbox', {
      name: /password/i,
    });
    userEvent.type(emailElement, emailText);
    userEvent.type(passwordElement, passwodText);
    const loginButton = await screen.getByRole('button', { name: 'Login' });
    await act(async () => {
      await fireEvent.click(loginButton);
    });
    const emailErrorElement = await screen.queryByText(emailErrorText);
    const passwordErrorElement = await screen.queryByText(passwordErrorText);
    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
  });

  it('should open the register pagen after clicking the register button', async () => {
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });
    await act(async () => {
      await fireEvent.click(registerButton);
    });
    expect(global.window.location.href).toContain('/register');
  });
});
