import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Home } from '../pages/home';
import * as allergyService from '../services/allergy.service';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { STATUS } from '../constants/api';
import { act } from 'react-dom/test-utils';

// Mock the API call
jest.mock('../services/allergy.service');
const allergyApiResponse = {
  status: STATUS.SUCCESS,
  data: [
    {
      id: 1,
      name: 'Allergy',
      causes: 'External medicine use',
      symptoms: 'Hallucination',
      severity: 'High',
      preventions: 'Medication',
      treatments: 'Medicine',
      createdAt: '2023-01-14',
    },
  ],
  message: 'Allergy retrieved successfully',
};

const apiResponse = {
  status: STATUS.SUCCESS,
  data: allergyApiResponse,
};

const mockAllergyRetrieve = jest.spyOn(allergyService, 'getAllergy');
mockAllergyRetrieve.mockReturnValue(apiResponse);

describe('Home Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the home page successfully', async () => {
    const pageElement = screen.getByRole('button', { name: 'Add Allergy' });
    expect(pageElement).toBeInTheDocument();
  });
});
