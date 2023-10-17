import React from 'react';
import PodcastEpisodesListItem from './PodcastEpisodesListItem'

const PodcastEpisodesList = ({ episodes, collectionId }: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Duration</th>
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
  )
}

export default PodcastEpisodesList;