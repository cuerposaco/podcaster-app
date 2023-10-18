import { request } from './request';

const BASE_HOST = 'https://itunes.apple.com';
const PODCAST_SEARCH_URL = `${BASE_HOST}/us/rss/toppodcasts/limit=100/genre=1310/json`;
const PODCAST_LOOKUP = `${BASE_HOST}/lookup`;

/**
 * Request All Podcast List
 */
export const requestPodcasts = (): Promise<any> => request(PODCAST_SEARCH_URL);

/**
 * Request Podcast data by Id
 */
export const requestPodcastById = (id: string): Promise<any> => request(`${PODCAST_LOOKUP}?id=${id}&media=podcast&entity=podcastEpisode`, true)

