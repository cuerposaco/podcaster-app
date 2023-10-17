import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PodcastSelected, PodcastSelectedContext, Episode } from '../contexts/PodcastContext';

function PodcastEpisodeDetail({className}:any) {
  const { episodeId } = useParams<"episodeId">();
  const podcast = useContext<PodcastSelected | null>(PodcastSelectedContext);
  const [episode, setEpisode] = useState<Episode|null>(null);

  useEffect(() => {
    const ep = podcast?.episodes?.find(({id}) => id === episodeId) || null;
    setEpisode(ep);
  }, [episodeId])

  return (
    <section className={`${className} container`}>
      {episode && (
        <>
          <div className="podcast-episode-detail__title">{episode?.title}</div>
          <div className="podcast-episode-detail__description" dangerouslySetInnerHTML={{__html: episode?.description}} />
          <div className="podcast-episode-detail__player-container">
            <audio className="podcast-episode-detail__player" src={episode?.enclosure} controls></audio>
          </div>
        </>
      )}
    </section>
  )
}

export default styled(PodcastEpisodeDetail)`
 &.container {
    border-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    padding: 1.5em;
    margin-bottom: 1em;
  }
  .podcast-episode-detail__title {
    font-size: 1.5em;
    font-weight: bold;
    padding: 0.5em 0 0;
  }
  .podcast-episode-detail__description {
    border-bottom: 1px solid #ccc;
    a {
      color: dodgerblue
    }
  }
  .podcast-episode-detail__player-container {
    width: 100%;
    padding: 1em 0 0;

    .podcast-episode-detail__player{
      width: 100%;
    }
  }
`;