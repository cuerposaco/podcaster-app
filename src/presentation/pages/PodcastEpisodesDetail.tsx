import React, { useContext } from 'react';
import styled from "styled-components";
import { PodcastSelected, PodcastSelectedContext } from '../contexts/PodcastContext';
import PodcastEpisodesList from '../components/PodcastEpisodesList'

function PodcastEpisodesDetail({className}:any) {
  const podcast = useContext<PodcastSelected | null>(PodcastSelectedContext);

  return (
    <div className={`${className} podcast-episodes-container`}>
      <div className="podcast-episodes-container__episodes-count container">
        Episodes: {podcast?.episodes.length || 0}
      </div>
      <div className="podcast-episodes-container__episodes-list container">
        <PodcastEpisodesList
          episodes={podcast?.episodes || []}
          collectionId={podcast?.collectionId}
        />
      </div>
    </div>
  )
}

export default styled(PodcastEpisodesDetail)`
  display: flex;
  flex-direction: column;

  .podcast-episodes-container__episodes-count {
    font-size: 1.2em;
    font-weight: bold;
  }

  .container {
    border-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    padding: 1em;
    margin-bottom: 1em;
  }
`;