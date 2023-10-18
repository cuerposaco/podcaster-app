import { setCache, getCache, isExpired, hashEncode } from './cache';
import { requestPodcasts, requestPodcastById } from '../repositories/podcast';

/**
 * Get All podcasts
 */
export const getPodcasts = (): Promise<any[]> => {
  const CACHE_KEY = 'all_podcast';

  if (!isExpired(hashEncode(CACHE_KEY))) {
    const { data } = getCache(hashEncode(CACHE_KEY));
    return Promise.resolve(data);
  }

  return requestPodcasts()
    .then((response) => response?.feed?.entry || [])
    .then(response => {
      return response.map((item:any) => ({
        id: item.id.attributes['im:id'],
        title: item.title.label,
        name: item['im:name'].label,
        author: item['im:artist'].label,
        image: item['im:image'],
        summary: item.summary.label
      }));
    })
    .then(result => {
      setCache(hashEncode(CACHE_KEY), result);
      return result;
    });
}

/**
 * Get Podcast by Id
 */
export const getPodcastById = (id: string): Promise<any> => {
  const CACHE_KEY = `podcast_${id}`;

  if (!isExpired(hashEncode(CACHE_KEY))) {
    const { data } = getCache(hashEncode(CACHE_KEY));
    return Promise.resolve(data);
  }

  return requestPodcastById(id)
    .then(async result => {
      const { results } = result;

      const episodes = results
        .filter((item:any) => item.kind === "podcast-episode")
        .map((ep:any) => ({
          id: String(ep.trackId),
          title: ep.trackName,
          description: ep.description,
          enclosure: ep.episodeUrl,
          duration: ep.trackTimeMillis,
          pubDate: ep.releaseDate,
        }));

      const { summary } = await getPodcasts().then(result => result.find((podcast) => podcast.id === id));

      const info = {
        ...results[0],
        description: summary,
        episodes
      }

      return info;
    })
    .then(result => {
      setCache(hashEncode(CACHE_KEY), result);
      return result;
    });
  }

