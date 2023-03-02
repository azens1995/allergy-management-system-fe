import React from 'react';
import { STATUS } from '../constants/api';
import { act } from 'react-dom/test-utils';
import * as authService from '../services/auth.service';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Register from '../pages/register';
import userEvent from '@testing-library/user-event';

jest.mock('../services/auth.service.js');

const registrationResponse = {
  status: 201,
  data: null,
  message: 'Resgistered successfully',
};

const apiResponse = {
  status: STATUS.SUCCESS,
  data: registrationResponse,
};

const mocRegisterUser = jest.spyOn(authService, 'register');
mocRegisterUser.mockResolvedValue(apiResponse);

const emailText = 'sample@sample.com';
const passwodText = 'samplePassword';
const firstNameText = 'John';
const lastNameText = 'Doe';

describe('Registration Page', () => {
  const emptyErrorText = 'Required!';
  const emailErrorText = 'Invalid email format';

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  // 1. Page render
  it('should render register page correctly', async () => {
    const element = screen.getByRole('heading');
    expect(element).toBeInTheDocument();
  });

  // 2. Submit with empty data should show error
  it('should show error messages when all the fields are not entered', async () => {
    const registerButton = screen.getByRole('button', { name: 'Register' });
    expect(registerButton).toBeEnabled();
    await act(async () => {
      await fireEvent.click(registerButton);
    });
    const registrationErrors = screen.getAllByText(emptyErrorText);
    registrationErrors.forEach((error) => {
      expect(error).toBeInTheDocument();
    });
  });

  it('should not show error message after clicking register when all the fields are entered', async () => {
    const firstNameElement = screen.getByRole('textbox', {
      name: /First Name/i,
    });
    const lastNameElement = screen.getByRole('textbox', { name: /Last Name/i });
    const emailElement = screen.getByRole('textbox', { name: /Email/i });
    const passwordElement = screen.getByRole('textbox', {
      name: /Password/i,
    });
    userEvent.type(firstNameElement, firstNameText);
    userEvent.type(lastNameElement, lastNameText);
    userEvent.type(emailElement, emailText);
    userEvent.type(passwordElement, passwodText);
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });
    await act(async () => {
      await fireEvent.click(registerButton);
    });
    const registrationErrors = screen.queryAllByText(emptyErrorText);
    const emailError = screen.queryByText(emailErrorText);
    expect(registrationErrors).toEqual([]);
    expect(emailError).toBeNull();
  });
});
