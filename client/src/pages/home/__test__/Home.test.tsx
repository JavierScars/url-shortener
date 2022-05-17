import { render, fireEvent, RenderResult } from '@testing-library/react';
import { Home } from '../Home';
import '@testing-library/jest-dom'
import { UserContext } from '../../../context/userContext';
import { ThemeProvider, theme } from "@chakra-ui/react";
import { fail } from 'assert';

const CustomComponent = ({ includeUser = false }) => {
  const user = includeUser ? { username: 'test123', id: 1, error: '' } : null;
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser: () => { } }}>
        <Home />
      </UserContext.Provider>
    </ThemeProvider>
  )
}

const ELEMENTS_TESTID = {
  HEADER_COMPONENT: 'header-component',
  ORIGINAL_URL_INPUT: 'original-url-input',
  CUSTOM_URL_INPUT: 'custom-url-input',
  CUSTOM_URL_CHECKBOX: 'custom-url-checkbox',
  SHORTEN_BUTTON: 'shorten-button',
}

describe('Home component', () => {

  test('It renders the header component', () => {
    const component = render(<CustomComponent />);
    expect(component.getByTestId(ELEMENTS_TESTID.HEADER_COMPONENT)).toBeInTheDocument();
  });

  describe('When there is no user logged in', () => {
    let component: RenderResult | null = null;
    let originalInput: HTMLElement | null = null;
    let shortenButton: HTMLElement | null = null;

    beforeEach(() => {
      component = render(<CustomComponent />);
      originalInput = component.getByTestId(ELEMENTS_TESTID.ORIGINAL_URL_INPUT);
      shortenButton = component.getByTestId(ELEMENTS_TESTID.SHORTEN_BUTTON);
    })


    test('It renders a working input url element', async () => {
      if (originalInput) {
        expect(originalInput).toBeInTheDocument();
        fireEvent.input(originalInput, { target: { value: 'www.example.com' } })
        expect(originalInput).toHaveValue('www.example.com')
      } else {
        fail('originalInput not found');
      }
    });

    test('It renders a disabled shorten button', async () => {
      expect(shortenButton).toBeInTheDocument();
      expect(shortenButton).toBeDisabled();
    });

    test('It validates the input url', async () => {
      if (originalInput) {
        fireEvent.input(originalInput, { target: { value: 'https://google' } })
        expect(shortenButton).toBeDisabled();
        fireEvent.input(originalInput, { target: { value: 'www.example.com' } })
        expect(shortenButton).toBeEnabled();
      }
      else {
        fail('originalInput not found');
      }
    })

    test('It doesnt render the custom url checkbox/text input', () => {
      if (component) {
        const customURLCheckbox = component.queryByTestId('custom-url-checkbox');
        const customURLInput = component.queryByTestId('custom-url-input');
        expect(customURLCheckbox).not.toBeInTheDocument();
        expect(customURLInput).not.toBeInTheDocument();
      }
      else {
        fail('component not found');
      }
    })
  })

  describe('When there is a user logged in', () => {
    let component: RenderResult | null = null;
    let originalInput: HTMLElement | null = null;
    let shortenButton: HTMLElement | null = null;
    let customInput: HTMLElement | null = null;
    let customCheckbox: HTMLElement | null = null;

    beforeEach(() => {
      component = render(<CustomComponent includeUser />);
      originalInput = component.getByTestId(ELEMENTS_TESTID.ORIGINAL_URL_INPUT);
      shortenButton = component.getByTestId(ELEMENTS_TESTID.SHORTEN_BUTTON);
      customInput = component.queryByTestId(ELEMENTS_TESTID.CUSTOM_URL_INPUT);
      customCheckbox = component.getByTestId(ELEMENTS_TESTID.CUSTOM_URL_CHECKBOX).querySelector('input');
    })

    test('It render a custom url checkbox but no a custom url input', async () => {
      expect(customCheckbox).toBeInTheDocument();
      expect(customInput).not.toBeInTheDocument();
    })

    test('It render a custom url input if the custom checkbox is checked', async () => {
      if (customCheckbox && component) {
        expect(customCheckbox).toBeInTheDocument();
        fireEvent.click(customCheckbox);
        expect(customCheckbox).toBeChecked();
        customInput = component.queryByTestId(ELEMENTS_TESTID.CUSTOM_URL_INPUT);
        expect(customInput).toBeInTheDocument();
      } else {
        fail('customCheckbox not found');
      }
    })

    test('It validates the custom url input element value', async () => {
      if (customCheckbox && component) {
        fireEvent.click(customCheckbox);
        customInput = component.queryByTestId(ELEMENTS_TESTID.CUSTOM_URL_INPUT);
        expect(customInput).toBeInTheDocument();
        if (customInput) {
          fireEvent.input(customInput, { target: { value: 'my custom input...' } })
          expect(customInput).toHaveValue('my_custom_input');
          return
        }
      }
      fail('customCheckbox or customInput not found');
    })

    test('If the custom url is enabled, the shorten button will be enabled only if a custom url value is provided', async () => {
      if (customCheckbox && component) {
        fireEvent.click(customCheckbox);
        customInput = component.queryByTestId(ELEMENTS_TESTID.CUSTOM_URL_INPUT);
        expect(customInput).toBeInTheDocument();
        expect(shortenButton).toBeDisabled();
        if (customInput && originalInput) {
          fireEvent.input(customInput, { target: { value: 'my_custom_url' } })
          fireEvent.input(originalInput, { target: { value: 'www.myurl.com' } })
          expect(shortenButton).toBeEnabled();

          return
        }
      }
      fail('customCheckbox or customInput not found');
    })

  })
})
