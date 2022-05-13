import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../Home';
import '@testing-library/jest-dom'

describe('Home component', () => {

  test('It renders the header component', () => {
    const component = render(<Home />);
    expect(component.getByTestId('header-component')).toBeInTheDocument();
  });

  test('It renders a working input url element', async () => {
    const component = render(<Home />);
    const input = component.getByPlaceholderText('www.example.com')
    expect(input).toBeInTheDocument();
    fireEvent.input(input, { target: { value: 'www.example.com' } })
    expect(input).toHaveValue('www.example.com')
  });

  test('It renders a disabled shorten button', async () => {
    const component = render(<Home />);
    const button = component.getByText('MAKE IT SHORT!')
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('It validates the input url', async () => {
    const component = render(<Home />);
    const input = component.getByPlaceholderText('www.example.com')
    const button = component.getByText('MAKE IT SHORT!')

    fireEvent.input(input, { target: { value: 'https://google' } })
    expect(button).toBeDisabled();
    fireEvent.input(input, { target: { value: 'www.example.com' } })
    expect(button).toBeEnabled();
  })
})
