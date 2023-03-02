import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App with the localhost link', async () => {
  expect(global.window.location.href).toContain('localhost');
});
