import React from 'react';
import PodcastEpisodesListItem from './PodcastEpisodesListItem';
import styled from "styled-components";

const PodcastEpisodesList = ({ className, episodes, collectionId }: any) => {
  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th className="head-title">Title</th>
            <th className="head-date">Date</th>
            <th className="head-duration">Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes?.map(({id, title, pubDate, duration}: any) => (
            <PodcastEpisodesListItem
              key={id}
              id={id}
              title={title}
              pubDate={pubDate}
              duration={duration}
              link={`/podcast/${collectionId}/episode/${id}`}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default styled(PodcastEpisodesList)`
  table {
    border-spacing: 0;
  }

  table > thead th {
    text-align: left;
    padding: 1em 0.5em;
    border-bottom: 1px solid #ccc;
  }
  .head-title {}
  .head-date {}
  .head-duration {
    text-align: center;
  }

  .head-date,
  .head-duration {
    width: 20%;
  }
`;