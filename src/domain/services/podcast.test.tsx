import React from 'react';
import '@testing-library/jest-dom';
import { getPodcasts, getPodcastById } from './podcast';
import * as requestService from '../repositories/request';
import { createStorage } from '../repositories/storage';
import * as cacheService from './cache';

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
};

const mockAllPodcastResponseExpected = [
  {
    "id": "foo-id",
    "title": "Foo Podcast Title",
    "name": "Foo Podcast name",
    "author": "Foo author",
    "image": [
      {
        "label": ""
      },
      {
        "label": ""
      },
      {
        "label": ""
      }
    ],
    "summary": "Foo Podcast summary"
  },
  {
    "id": "Bar-id",
    "title": "Bar Podcast Title",
    "name": "Bar Podcast name",
    "author": "Bar author",
    "image": [
      {
        "label": ""
      },
      {
        "label": ""
      },
      {
        "label": ""
      }
    ],
    "summary": "Bar Podcast summary"
  }
];

const mockEpisodesResponse = {
  resultCount: 2,
  results: [
    {
      "kind": "podcast",
      "collectionId": 'foo-id',
      "artistName": "Foo Podcast name",
      "collectionName": "Foo Podcast name",
      "trackName": "Foo Podcast name",
      "artworkUrl30": "",
      "artworkUrl60": "",
      "artworkUrl100": "",
      "artworkUrl600": "",
    },
    {
      "trackTimeMillis": 11956000,
      "artworkUrl60": "",
      "artworkUrl600": "",
      "artworkUrl160": "",
      "description": "The foo bar episode summary",
      "episodeUrl": "https://foo.bar.mp3",
      "releaseDate": "2023-10-18T07:00:00Z",
      "collectionId": 'foo-id',
      "trackId": 1000631703127,
      "trackName": "Episode 1 - Fooooooo",
      "kind": "podcast-episode",
    },
  ]
};

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  const store = createStorage('local');
  store.clear();
});

test('Should request podcasts', async () => {
  jest.spyOn(requestService, 'request').mockResolvedValue({ ...mockAllPodcastResponse });
  const spyCache = jest.spyOn(cacheService, 'setCache');

  const response = await getPodcasts();

  expect(response).toStrictEqual(mockAllPodcastResponseExpected);
  expect(spyCache).toBeCalledTimes(1);
});

test('Should request podcasts by id', async () => {
  const spy = jest.spyOn(requestService, 'request')
    .mockResolvedValueOnce({ ...mockEpisodesResponse })
    .mockResolvedValueOnce({ ...mockAllPodcastResponse });

  const spyCache = jest.spyOn(cacheService, 'setCache');

  const response = await getPodcastById('foo-id');

  expect(spyCache).toBeCalledTimes(2);
  expect(spy).toHaveBeenNthCalledWith(1, "https://itunes.apple.com/lookup?id=foo-id&media=podcast&entity=podcastEpisode", true);
  expect(spy).toHaveBeenNthCalledWith(2, "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");

  expect(response.episodes).toStrictEqual([
    {
      "description": "The foo bar episode summary",
      "duration": 11956000,
      "enclosure": "https://foo.bar.mp3",
      "id": "1000631703127",
      "pubDate": "2023-10-18T07:00:00Z",
      "title": "Episode 1 - Fooooooo",
    }
  ])
});

test('Should request podcasts by id from cache', async () => {
  const spy = jest.spyOn(requestService, 'request')
    .mockResolvedValueOnce({ ...mockEpisodesResponse })
    .mockResolvedValueOnce({ ...mockAllPodcastResponse });

  const spyCache = jest.spyOn(cacheService, 'getCache');

  await getPodcastById('foo-id');
  expect(spyCache).toBeCalledTimes(0);

  spy.mockReset();

  await getPodcastById('foo-id');
  expect(spyCache).toBeCalledTimes(1);
});

