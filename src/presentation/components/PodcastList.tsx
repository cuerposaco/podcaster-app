import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import PodcastListItem from './PodcastListItem';

const PodcastList = ({ className, items }: any) => {
  return (
    <div className={`${className}`}>
      <ul className="podcast-list">
        {items.map((item:any) => (
          <li key={item.id} className="podcast-list__item">
            <NavLink to={`/podcast/${item.id}`}>
              <PodcastListItem
                id={item.id}
                title={item.name}
                author={item.author}
                image={item.image[2].label}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default styled(PodcastList)`
  .podcast-list {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    align-content: flex-start;

    .podcast-list__item {
      box-sizing: border-box;
      max-width: 275px;
      padding: 0.7rem;
      flex-grow: 4;
    }
  }
`;