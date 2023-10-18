import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';

import * as requestService from './domain/repositories/request';
import * as cacheService from './domain/services/cache';
import App from './App';


const mockAllPodcastResponse = {
  feed: {
    entry: [
      {
        "im:name": {
          "label": "Foo Podcast name"
        },
        "im:image": [
          {
            "label": "",
          },
          {
            "label": "",
          },
          {
            "label": "",
          }
        ],
        "summary": {
          "label": "Foo Podcast summary"
        },
        "title": {
          "label": "Foo Podcast Title"
        },
        "id": {
          "attributes": {
            "im:id": "foo-id"
          }
        },
        "im:artist": {
          "label": "Foo author"
        }
      },
      {
        "im:name": {
          "label": "Bar Podcast name"
        },
        "im:image": [
          {
            "label": "",
          },
          {
            "label": "",
          },
          {
            "label": "",
          }
        ],
        "summary": {
          "label": "Bar Podcast summary"
        },
        "title": {
          "label": "Bar Podcast Title"
        },
        "id": {
          "attributes": {
            "im:id": "Bar-id"
          }
        },
        "im:artist": {
          "label": "Bar author"
        }
      }
    ]
  }
}

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('Render App', async () => {
  const spy = jest.spyOn(requestService, 'request').mockResolvedValue({ ...mockAllPodcastResponse });
  const spyCache = jest.spyOn(cacheService, 'setCache');

  render(<App />, { wrapper: BrowserRouter });
  expect(screen.getByText(/podcaster/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Foo Podcast name/i)).toBeInTheDocument();
  });

  expect(screen.getByTestId('items-counter').innerHTML).toBe('2');
  expect(spy).toBeCalledWith('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  expect(spyCache).toBeCalledTimes(1);
});

test('Filter podcasts', async () => {
  jest.spyOn(requestService, 'request').mockResolvedValue({ ...mockAllPodcastResponse });

  render(<App />, { wrapper: BrowserRouter });

  await waitFor(() => {
    expect(screen.getByText(/Foo Podcast name/i)).toBeInTheDocument();
  });

  const inputEl = screen.getByRole('textbox');

  fireEvent.change(inputEl, { target: { value: 'bar' }});
  expect(screen.getByText(/Bar Podcast name/i)).toBeInTheDocument();

  fireEvent.change(inputEl, { target: { value: 'foo' } });
  expect(screen.getByText(/Foo Podcast name/i)).toBeInTheDocument();
});
