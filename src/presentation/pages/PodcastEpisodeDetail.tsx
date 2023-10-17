import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PodcastSelected, PodcastSelectedContext, Episode } from '../contexts/PodcastContext';

function PodcastEpisodeDetail() {
  const { episodeId } = useParams<"episodeId">();
  const podcast = useContext<PodcastSelected | null>(PodcastSelectedContext);
  const [episode, setEpisode] = useState<Episode|null>(null);

  useEffect(() => {
    // console.log('PodcastEpisodeDetail', podcast);
    const ep = podcast?.episodes?.find(({id}) => id === episodeId) || null;
    setEpisode(ep);
  }, [episodeId])

  return (
    <section>
      {episode && (
        <>
          <h3>{episode?.title}</h3>
          <div dangerouslySetInnerHTML={{__html: episode?.description}} />
          <audio src={episode?.enclosure} controls></audio>
        </>
      )}
    </section>
  )
}

export default PodcastEpisodeDetail;