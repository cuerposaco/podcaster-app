import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPodcastById } from '../../../domain/services/podcast';
import { PodcastSelectedContext, PodcastSelected } from '../../contexts/PodcastContext';
import {useRequest} from "../../hooks/request";
import PodcastCard from '../../components/PodcastCard';

function LayoutPodcast({className}: any) {
  const { podcastId } = useParams<"podcastId">();
  const [podcastData, setPodcastData] = useState<PodcastSelected | null>(null);
  const { setRequest } = useRequest();

  useEffect(() => {
    if(podcastId) {
      setRequest({ loading: true });
      getPodcastById(podcastId)
        .then(item => {
          setPodcastData(item)
        })
        .catch(() => {})
        .finally(() => {
          setRequest({ loading: false });
        })
    }
  }, [podcastId]);

  return (
    <section className={className}>
      {podcastData && (
        <>
          <div className="left-section section">
            <PodcastCard id={podcastData.collectionId} name={podcastData.trackName} author={podcastData.artistName} description={podcastData?.description} image={podcastData.artworkUrl600} />
          </div>
          <div className="right-section section">
            <PodcastSelectedContext.Provider value={podcastData}>
              <Outlet />
            </PodcastSelectedContext.Provider>
          </div>
        </>
      )}
    </section>
  );
}

export default styled(LayoutPodcast)`
  display: flex;
  flex-direction: row;
  .section {
    padding: 1em;
  }
  .left-section {
    width: 30%;
  }
  .right-section {
    width: 70%;
  }
`;