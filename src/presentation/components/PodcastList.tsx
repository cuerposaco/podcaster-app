import React from 'react';
import { NavLink } from 'react-router-dom';
import PodcastListItem from './PodcastListItem';

const PodcastList = ({ items }) => {
  return (
    <div className="podcast-list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <NavLink to={`/podcast/${item.id}`}>
              <PodcastListItem
                id={item.id}
                title={item.title}
                author={item.author}
                image={item.image[0].label}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PodcastList;