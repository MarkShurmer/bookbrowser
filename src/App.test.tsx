import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Book Browser/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders container', async () => {
  render(<App />);
  const element = await screen.findByTestId("container");
  expect(element).toBeInTheDocument();
});
