import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { requestPodcasts, requestPodcastById } from './podcast';
import * as requestService from './request';

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('Should request podcasts', async () => {
  const spy = jest.spyOn(requestService, 'request').mockResolvedValue(true);

  await requestPodcasts();
  expect(spy).toBeCalledWith('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
});

test('Should request podcasts by id', async () => {
  const spy = jest.spyOn(requestService, 'request').mockResolvedValue(true);

  await requestPodcastById('123456');
  expect(spy).toBeCalledWith('https://itunes.apple.com/lookup?id=123456&media=podcast&entity=podcastEpisode', true);
});

