import { render, screen } from '@testing-library/react';
import { Home } from '../Home';
import '@testing-library/jest-dom'

test('Renders the App component', () => {
  render(<Home />);
  expect(screen.getByTestId('header-component')).toBeInTheDocument();
});
