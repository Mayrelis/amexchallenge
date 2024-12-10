import React from 'react';
import { render, screen } from '@testing-library/react';
import { useCachingFetch, preloadCachingFetch } from '../caching-fetch-library/cachingFetch';
import App from '../application/App';


// Mock the library methods
jest.mock('../caching-fetch-library/cachingFetch', () => ({
  useCachingFetch: jest.fn(),
  preloadCachingFetch: jest.fn(),
}));

// Define mock functions with explicit types
const mockedUseCachingFetch = useCachingFetch as jest.Mock<
  ReturnType<typeof useCachingFetch>,
  Parameters<typeof useCachingFetch>
>;

const mockedPreloadCachingFetch = preloadCachingFetch as jest.Mock<
  ReturnType<typeof preloadCachingFetch>,
  Parameters<typeof preloadCachingFetch>
>;

// Mock data to simulate different states
const mockPersonData = {
  data: [
    {
      email: 'jane.doe@example.com',
      first: 'Jane',
      last: 'Doe',
      address: '456 Elm St',
      created: '2022-05-15',
      balance: '1500',
    },
  ],
  isLoading: false,
  error: null,
};

beforeEach(() => {
  jest.resetAllMocks();
  mockedUseCachingFetch.mockReturnValue(mockPersonData);
});

/**
 * Test to ensure the application renders the header.
 */
test('renders application header', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Welcome to the People Directory/i })).toBeInTheDocument();
});

/**
 * Test to ensure the app displays a person's name when data is loaded.
 */
test('renders a person\'s full name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Jane Doe/i);
  expect(nameElement).toBeInTheDocument();
});

/**
 * Test to check if a loading spinner or text appears while fetching data.
 */
test('shows loading indicator when data is loading', () => {
  mockedUseCachingFetch.mockReturnValue({ data: null, isLoading: true, error: null });
  render(<App />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

/**
 * Test to ensure an error message is displayed when fetching data fails.
 */
test('renders error message on fetch failure', () => {
  mockedUseCachingFetch.mockReturnValue({
    data: null,
    isLoading: false,
    error: new Error('Unable to fetch data'),
  });
  render(<App />);
  expect(screen.getByText(/Error: Unable to fetch data/i)).toBeInTheDocument();
});

/**
 * Test to validate server-side data preloading.
 */
test('calls preloadCachingFetch with correct API URL during server-side rendering', async () => {
  mockedPreloadCachingFetch.mockResolvedValueOnce(undefined);

  if (typeof App.preLoadServerData === 'function') {
    await App.preLoadServerData();
    expect(mockedPreloadCachingFetch).toHaveBeenCalledWith(
      'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole&seed=123'
    );
    expect(mockedPreloadCachingFetch).toHaveBeenCalledTimes(1);
  } else {
    throw new Error('App.preLoadServerData is not defined');
  }
});
