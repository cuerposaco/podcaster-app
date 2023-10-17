import { setCache, getCache, isExpired, hashEncode } from './cache';

const PODCAST_HOST = 'https://itunes.apple.com';
const PODCAST_SEARCH_URL = `${PODCAST_HOST}/us/rss/toppodcasts/limit=100/genre=1310/json`;
const PODCAST_LOOKUP = `${PODCAST_HOST}/lookup`;

const bypassCors = (url: string): string => {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  // return `https://cors-anywhere.herokuapp.com/${encodeURIComponent(url)}`;
}

const parseJSON = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

/**
 * Base request with cache strategy
 */
const request = (url: string, bypassCORS: boolean = false) => {
  if (!isExpired(hashEncode(url))) {
    console.log('cached data!!!', url);
    const { data } = getCache(hashEncode(url));
    return Promise.resolve(data);
  }

  console.log('refresh data!!!', url);
  return fetch(bypassCORS ? bypassCors(url) : url)
    .then(response => response.json())
    .then(result => bypassCORS ? parseJSON(result.contents) : result)
    .then(result => {
      setCache(hashEncode(url), result);
      return result;
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

/**
 * Request All Podcast List
 */
export const requestPodcasts = (): Promise<any> => request(PODCAST_SEARCH_URL);

/**
 * Request Podcast Feed
 */
export const requestPodcastFeed = (url: string): Promise<any> => request(url, true);

/**
 * Request Podcast data by Id
 */
export const requestPodcastById = (id: string): Promise<any> => request(`${PODCAST_LOOKUP}?id=${id}`, true)

/**
 * Get All podcasts
 */
export const getPodcasts = (): Promise<any[]> =>
  requestPodcasts()
    .then((response) => response?.feed?.entry || []);

/**
 * Get Podcast by Id
 */
export const getPodcastById = (id: string): Promise<any> =>
  requestPodcastById(id)
    .then(async result => {
      const { results: [podcastInfo] } = result;
      const feed = await requestPodcastFeed(podcastInfo.feedUrl)
        .then(str => {
          if (str.includes('base64')) {
            const [, content] = str.split(',');
            const strParsed = decodeURIComponent(escape(atob(content)));
            return new window.DOMParser().parseFromString(strParsed, "text/xml");
          }
          return new window.DOMParser().parseFromString(str, "text/xml");
        });

      const info = {
        ...podcastInfo,
        description: feed.querySelector('rss > channel > description')?.textContent,
        episodes: [...feed.querySelectorAll('rss > channel > item')].map(item => ({
          id: item.querySelector('guid')?.textContent,
          title: item.querySelector('title')?.textContent,
          description: item.querySelector('description')?.textContent,
          enclosure: item.querySelector('enclosure')?.attributes.getNamedItem("url")?.value,
          duration: item.querySelector('duration')?.textContent,
          pubDate: item.querySelector('pubDate')?.textContent
        }))
      }

      return info;
    });

