import React from 'react';
import styled from "styled-components";

const PodcastListItem = ({ className, id, title, author, image }: any) => {
  return (
    <div className={`${className} podcast-list-item`}>
      <div className="podcast-list-item__image-container">
        <img className="podcast-list-item__image-container__image" src={image} alt={title} />
      </div>
      <span className="podcast-list-item__title">{title}</span>
      <span className="podcast-list-item__author">Author: {author}</span>
    </div>
  )
}

export default styled(PodcastListItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
  margin-top: 50px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 75%;
    margin-top: 25%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 0.2rem;
    z-index: -1;
  }

  .podcast-list-item__image-container {
    position: relative;
    margin: 0.5em 0;
  }

  .podcast-list-item__image-container:before {
    content: "";
    width: 140px;
    height: 140px;
    top:0; left: 50%;
    transform: translateX(-50%);
    position: absolute;
    background-color: white;
    background-image: ${({ image }) => `url("${image}")`};
    border-radius: 100%;
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;
  }

  .podcast-list-item__image-container__image {
    border-style: none;
    border-radius: 100%;
    max-width: 80%;
    background-color: white;
    visibility: hidden;
  }
  .podcast-list-item__title {
    padding: 0.5em 0;
    text-transform: uppercase;
    font-weight: bold;
  }
  .podcast-list-item__author {
    padding: 0.5em 0;
    font-size: 0.9rem;
    color: #999;
  }
`;