import { createContext } from 'react';

export type Episode = {
  id: string;
  title: string;
  enclosure: string;
  pubDate: string;
  duration: string;
  description: string;
};

export type PodcastSelected = {
  trackId: string;
  collectionId: Number;
  collectionName: string;
  artistName: string;
  trackName: string;
  feedUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  description: string;
  episodes: [Episode]
};

export const PodcastSelectedContext = createContext <PodcastSelected | null>(null);