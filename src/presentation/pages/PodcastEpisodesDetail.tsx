import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PodcastSelected, PodcastSelectedContext } from '../contexts/PodcastContext';

function PodcastEpisodesDetail() {
  const podcast = useContext<PodcastSelected | null>(PodcastSelectedContext);

  return (
    <div>
      Podcast detail
      <ul>
        {podcast?.episodes?.map(ep => (<li key={ep.id}><NavLink to={`/podcast/${podcast?.collectionId}/episode/${ep.id}`}>{ep.title}</NavLink></li>))}
      </ul>
    </div>
  )
}

export default PodcastEpisodesDetail;