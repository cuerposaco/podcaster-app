import React from 'react';

const PodcastListItem = ({ id, title, author, image }) => {
  return (
    <div className="podcast-list-item">
      <div className="podcast-list-item__image"><img src={image} alt={title} /></div>
      <span class="podcast-list-item__title">{title}</span>
      <span class="podcast-list-item__author">Author: {author}</span>
    </div>
  )
}

export default PodcastListItem;