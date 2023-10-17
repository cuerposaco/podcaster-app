import { createStorage } from '../repositories/storage';

const MILLISECOND = 1000;
const SECOND = MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const store = createStorage('local');
const TTL = DAY;

export const setCache = (key: string, data: any) => {
  store.setItem(key, JSON.stringify({ timeStamp: Date.now(), data }));
  return data;
}

export const getCache = (key:string) => {
  const data = store.getItem(key);
  return data ? JSON.parse(data) : data;
}

export const isExpired = (key:string) => {
  const { timeStamp } = getCache(key) || {};
  if (!timeStamp) {
    return true;
  }
  const diffTime = Date.now() - timeStamp;
  const expired =  diffTime > TTL;
  return expired;
}

export const hashEncode = (key: string) => btoa(key);