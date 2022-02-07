import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Project Dashboard', () => {
  render(<App />);
  const linkElement = screen.getByText(/Project Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
