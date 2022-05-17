import { render, fireEvent, RenderResult, waitFor } from '@testing-library/react';
import { Login } from '../Login';
import '@testing-library/jest-dom'
import { UserContext } from '../../../context/userContext';
import { fail } from 'assert';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme, ThemeProvider, useNumberInput } from '@chakra-ui/react';

const CustomComponent = ({ includeUser = false }) => {
  const user = includeUser ? { username: 'test123', id: 1, error: '' } : null;
  return (
    <UserContext.Provider value={{ user, setUser: () => { } }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider >
  )
}

const ELEMENTS_TESTID = {
  USERNAME_INPUT: 'username-input',
  PASSWORD_INPUT: 'password-input',
  CONFIRM_PASSWORD_INPUT: 'confirm-password-input',
  SUBMIT_BUTTON: 'submit-button',
  MODE_SELECTOR_SIGNIN: 'mode-selector-button-signin',
  MODE_SELECTOR_SIGNUP: 'mode-selector-button-signup',
}

describe('Login component', () => {

  test('It renders', () => {
    const component = render(<CustomComponent />);
    expect(component).toBeTruthy()
  });

  describe('When its in signin mode', () => {
    let component: RenderResult | null = null;
    let usernameInput: HTMLElement | null = null;
    let passwordInput: HTMLElement | null = null;
    let submitButton: HTMLElement | null = null;
    let modeSelectorSignin: HTMLElement | null = null;
    let modeSelectorSignup: HTMLElement | null = null;

    beforeEach(async () => {
      component = render(<CustomComponent />);
      usernameInput = component.getByTestId(ELEMENTS_TESTID.USERNAME_INPUT);
      passwordInput = component.getByTestId(ELEMENTS_TESTID.PASSWORD_INPUT);
      submitButton = component.getByTestId(ELEMENTS_TESTID.SUBMIT_BUTTON);
      modeSelectorSignin = component.getByTestId(ELEMENTS_TESTID.MODE_SELECTOR_SIGNIN);
      modeSelectorSignup = component.getByTestId(ELEMENTS_TESTID.MODE_SELECTOR_SIGNUP);
    })


    test('It renders the username, password inputs and the submit button', async () => {
      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    test('It disables the submit button until the username and password inputs are filled', async () => {
      if (usernameInput && passwordInput) {
        expect(submitButton).toBeDisabled();

        fireEvent.input(usernameInput, { target: { value: 'test' } })
        waitFor(() => {
          expect(useNumberInput).toHaveValue('test')
        })

        fireEvent.input(passwordInput, { target: { value: 'test' } })
        waitFor(() => {
          expect(passwordInput).toHaveValue('test')
        })

        expect(submitButton).toBeEnabled();
      } else {
        fail('usernameInput or passwordInput not found');
      }
    });

    test('It renders the signin/signup mode selector', async () => {
      expect(modeSelectorSignin).toBeInTheDocument();
      expect(modeSelectorSignup).toBeInTheDocument();
    })

    test('It only has the signup mode selector enabled', () => {
      expect(modeSelectorSignin).toBeDisabled();
      expect(modeSelectorSignup).toBeEnabled();
    })

    test('It changes the mode to signup on click', () => {
      if (modeSelectorSignup) {
        fireEvent.click(modeSelectorSignup);
        expect(modeSelectorSignin).toBeEnabled();
        expect(modeSelectorSignup).toBeDisabled();
      }
      else {
        fail('modeSelectorSignup not found');
      }
    })
  })

  describe('When its in signup mode', () => {
    let component: RenderResult | null = null;
    let usernameInput: HTMLElement | null = null;
    let passwordInput: HTMLElement | null = null;
    let confirmPasswordInput: HTMLElement | null = null;
    let submitButton: HTMLElement | null = null;
    let modeSelectorSignin: HTMLElement | null = null;
    let modeSelectorSignup: HTMLElement | null = null;

    beforeEach(async () => {
      component = render(<CustomComponent />);
      usernameInput = component.getByTestId(ELEMENTS_TESTID.USERNAME_INPUT);
      passwordInput = component.getByTestId(ELEMENTS_TESTID.PASSWORD_INPUT);
      submitButton = component.getByTestId(ELEMENTS_TESTID.SUBMIT_BUTTON);
      modeSelectorSignin = component.getByTestId(ELEMENTS_TESTID.MODE_SELECTOR_SIGNIN);
      modeSelectorSignup = component.getByTestId(ELEMENTS_TESTID.MODE_SELECTOR_SIGNUP);
      fireEvent.click(modeSelectorSignup);
      confirmPasswordInput = component.queryByTestId(ELEMENTS_TESTID.CONFIRM_PASSWORD_INPUT);
    })


    test('It renders the username, password, and confirm password inputs and the submit button', async () => {
      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    test('It disables the submit button until the signup form inputs are properly filled', async () => {
      if (usernameInput && passwordInput && confirmPasswordInput) {
        expect(submitButton).toBeDisabled();

        fireEvent.input(usernameInput, { target: { value: 'test' } })
        waitFor(() => {
          expect(useNumberInput).toHaveValue('test')
        })

        fireEvent.input(passwordInput, { target: { value: 'test' } })
        waitFor(() => {
          expect(passwordInput).toHaveValue('test')
        })

        fireEvent.input(confirmPasswordInput, { target: { value: 'test' } })
        waitFor(() => {
          expect(confirmPasswordInput).toHaveValue('test')
        })

        expect(submitButton).toBeEnabled();
      } else {
        fail('usernameInput, passwordInput, or confirmPasswordInput not found');
      }
    });

    test('It renders the signin/signup mode selector', async () => {
      expect(modeSelectorSignin).toBeInTheDocument();
      expect(modeSelectorSignup).toBeInTheDocument();
    })

    test('It only has the signin mode selector enabled', () => {
      expect(modeSelectorSignin).toBeEnabled();
      expect(modeSelectorSignup).toBeDisabled();
    })

    test('It can change back to signin on click', () => {
      if (modeSelectorSignin) {
        fireEvent.click(modeSelectorSignin);
        expect(modeSelectorSignin).toBeDisabled();
        expect(modeSelectorSignup).toBeEnabled();
      }
      else {
        fail('modeSelectorSignin not found');
      }
    })
  })
})
