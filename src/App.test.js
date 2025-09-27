import { render, screen } from '@testing-library/react';
import App from './App';

test('renders VR Cleaners heading', () => {
  render(<App />);
  const heading = screen.getByText(/vr cleaners/i);
  expect(heading).toBeInTheDocument();
});
