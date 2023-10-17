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
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    .podcast-list__item {
      width: 25%;
      padding: 0.7rem;
      box-sizing: border-box;
    }
  }
`;