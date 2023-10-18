import React from 'react';
import { request } from './request';

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('Should do request', async () => {
  global.fetch = jest.fn(():Promise<any> => Promise.resolve({
    json: (): Promise<any> => Promise.resolve({'foo': 'bar'})
  }));

  await request('https://foo.com/bar');
  expect(global.fetch).toBeCalledWith('https://foo.com/bar');
});

test('Should do request using byPassCors', async () => {
  global.fetch = jest.fn((): Promise<any> => Promise.resolve({
    json: (): Promise<any> => Promise.resolve({ 'foo': 'bar' })
  }));

  await request('https://foo.com/bar', true);
  expect(global.fetch).toBeCalledWith('https://api.allorigins.win/get?url=https%3A%2F%2Ffoo.com%2Fbar');
});

test('Should do return response if json() fails', async () => {
  global.fetch = jest.fn((): Promise<any> => Promise.resolve({
    json: (): Promise<any> => Promise.reject(new Error('not json'))
  }));

  const response = await request('https://foo.com/bar');
  expect(response).toBeDefined();
});


test('Should retry request if request fails', async () => {
  global.fetch = jest.fn((): Promise<any> => Promise.reject(new Error('not json')));

  await expect(request('https://foo.com/bar')).rejects.toThrow('not json');
  expect(global.fetch).toBeCalledTimes(2);
});

