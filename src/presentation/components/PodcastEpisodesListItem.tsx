import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { formatDate, formatTime } from '../../domain/value_objects/date_time';

const PodcastEpisodesListItem = ({ className, title, pubDate, duration, link }: any) => {
  return (
    <tr className={className}>
      <td className="body-title"><NavLink to={link}>{title}</NavLink></td>
      <td className="body-date">{formatDate(pubDate)}</td>
      <td className="body-duration">{(duration && formatTime(duration)) || `--`}</td>
    </tr>
  )
}

export default styled(PodcastEpisodesListItem)`
  td {
    padding: 1em 0.5em;
    border-bottom: 1px solid #ccc;
  }

  &:nth-child(odd) {
    background-color: #f2f2f2;
  }

  &:last-child td {
    border-bottom: none;
  }

  a {
    color: dodgerblue
  }

  .body-title {}
  .body-date {}
  .body-duration {
    text-align: center;
  }
`;