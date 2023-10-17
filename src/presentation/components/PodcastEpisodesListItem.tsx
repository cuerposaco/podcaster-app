import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const PodcastEpisodesListItem = ({ className, id, title, pubDate, duration, link }: any) => {
  return (
    <tr className={className}>
      <td className="body-title"><NavLink to={link}>{title}</NavLink></td>
      <td className="body-date">{(new Date(pubDate)).toLocaleString('en-US', { dateStyle: 'short' })}</td>
      <td className="body-duration">{duration}</td>
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

  a {
    color: dodgerblue
  }
  .body-title {}
  .body-date {}
  .body-duration {
    text-align: center;
  }

`;