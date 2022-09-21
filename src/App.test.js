import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';

test('renders learn react link', () => {
  render(<UserForm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
