import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PodcastSelected, PodcastSelectedContext } from '../contexts/PodcastContext';
import Card from '../components/ui/Card'
import PodcastEpisodesList from '../components/PodcastEpisodesList'

function PodcastEpisodesDetail() {
  const podcast = useContext<PodcastSelected | null>(PodcastSelectedContext);

  return (
    <>
      <Card>
        <h3>Episodes: {podcast?.episodes.length || 0}</h3>
      </Card>
      <Card>
        <PodcastEpisodesList
          episodes={podcast?.episodes || []}
          collectionId={podcast?.collectionId}
        />
      </Card>
    </>
  )
}

export default PodcastEpisodesDetail;