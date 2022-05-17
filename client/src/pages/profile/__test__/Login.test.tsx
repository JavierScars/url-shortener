import { render, RenderResult, waitFor } from '@testing-library/react';
import { Profile } from '../Profile';
import '@testing-library/jest-dom'
import { UserContext } from '../../../context/userContext';
import { fail } from 'assert';
import { act } from 'react-dom/test-utils';
import { IShortenURL } from '../../../interfaces/IUrl';

const CustomComponent = ({ includeUser = false }) => {
  const user = includeUser ? { username: 'test123', id: 1, error: '' } : null;
  return (
    <UserContext.Provider value={{ user, setUser: () => { } }}>
      <Profile />
    </UserContext.Provider >
  )
}

const ELEMENTS_TESTID = {
  LOADING_SPINNER: 'loading-spinner',
  TABLE: 'urls-table',
  TABLE_HEADERS: 'urls-table-headers',
  ROW_ORIGINAL_URL: 'row-original-url',
  ROW_SHORTEN_URL: 'row-shorten-url',
}

const baseUrl = process.env.REACT_APP_CLIENT_BASE_URL

const URLS: IShortenURL[] = [
  {
    id: 1, url: 'https://www.test1.com', shortenUrl: `${baseUrl}/test1`, customCode: '', visitCount: 0, hash: 'test1', username: 'test123'
  },
  { id: 2, url: 'https://www.test2.com', shortenUrl: `${baseUrl}/test2`, customCode: 'custom_test_2', visitCount: 0, hash: 'test2', username: 'test123' }];

describe('Profile component', () => {
  let originFetch: typeof global.fetch;
  let component: RenderResult | null = null;
  let loadingSpinner: HTMLElement | null = null;
  let table: HTMLElement | null = null;
  let tableHeaders: HTMLElement | null = null;

  describe('if fetch success', () => {
    beforeEach(async () => {
      originFetch = (global as any).fetch;
      (global as any).fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          const urls = [...URLS.map(url => ({ ...url }))];
          setTimeout(() => {
            return resolve({
              ok: true,
              status: 200,
              json: () => Promise.resolve({ URLs: [...urls] })
            })
          }, 200)
        })
      });

      await act(() => {
        component = render(<CustomComponent />);
      })
      if (component) {
        loadingSpinner = component.getByTestId(ELEMENTS_TESTID.LOADING_SPINNER);
      } else {
        fail('component is null');
      }
    });
    afterEach(() => {
      (global as any).fetch = originFetch;
    });

    test('renders correctly', () => {
      expect(true).toBeTruthy();
    })

    test('it fetch the user URLs', async () => {
      expect(loadingSpinner).toBeInTheDocument();
      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      })
    })

    test('it renders the table properly', async () => {
      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      })
      table = component!.getByTestId(ELEMENTS_TESTID.TABLE);
      expect(table).toBeInTheDocument();
      tableHeaders = component!.getByTestId(ELEMENTS_TESTID.TABLE_HEADERS);
      expect(tableHeaders).toBeInTheDocument();
    })

    test('it renders the table rows properly', async () => {
      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      }
      )
      const orignialURLTableRows = component!.getAllByTestId(ELEMENTS_TESTID.ROW_ORIGINAL_URL);
      const shortenURLTableRows = component!.getAllByTestId(ELEMENTS_TESTID.ROW_SHORTEN_URL);
      expect(orignialURLTableRows.length).toBe(URLS.length);
      expect(shortenURLTableRows.length).toBe(URLS.length);
      URLS.forEach((url, index) => {
        expect([url.shortenUrl, `${baseUrl}/${url.username}/${url.customCode}`]).toContain(shortenURLTableRows[index].innerHTML);
        expect(orignialURLTableRows[index].innerHTML).toBe(url.url);
      })
    })
  })
})
