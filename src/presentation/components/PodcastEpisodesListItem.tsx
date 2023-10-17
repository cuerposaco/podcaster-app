import React from 'react';
import { NavLink } from 'react-router-dom';

const PodcastEpisodesListItem = ({ id, title, pubDate, duration, link }: any) => {
  return (
    <tr>
      <td><NavLink to={link}>{title}</NavLink></td>
      <td>{pubDate}</td>
      <td>{duration}</td>
    </tr>
  )
}

export default PodcastEpisodesListItem;