import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { getPodcastById } from '../../domain/services/podcast';
import { PodcastSelectedContext, PodcastSelected } from '../contexts/PodcastContext';
import {useRequest} from "../hooks/request";

function LayoutPodcast() {
  const { podcastId } = useParams<"podcastId">();
  const [podcastData, setPodcastData] = useState<PodcastSelected | null>(null);

  const { request, setRequest } = useRequest();

  useEffect(() => {
    if(podcastId) {
      setRequest({ loading: true });
      getPodcastById(podcastId)
        .then(item => {
          console.log('getPodcastById', item);
          setPodcastData(item)
        })
        .catch(() => {})
        .finally(() => {
          setRequest({ loading: false });
        })
    }
  }, [podcastId]);

  return (
    <section id="podcast">
      <span>request: {JSON.stringify(request)}</span>
      {podcastData && (
        <>
          <div>
            <img src={podcastData.artworkUrl100} />
            <hr />
            {podcastData?.trackName}
            <hr />
            Description:
            <div dangerouslySetInnerHTML={{__html: podcastData?.description}} />
          </div>
          <div>
            <PodcastSelectedContext.Provider value={podcastData}>
              <Outlet />
            </PodcastSelectedContext.Provider>
          </div>
        </>
      )}
    </section>
  );
}

export default LayoutPodcast;