import React from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const PodcastCard = ({ id, className, name, author, description, image }: any) => {
  return (
    <div className={`${className} podcast-card`}>
      <div className="podcast-card__image-container">
        <NavLink to={`/podcast/${id}`}>
          <img className="podcast-card__image-container__image" src={image} alt={name}/>
        </NavLink>
      </div>
      <dl className="podcast-card__title">
        <dt><NavLink to={`/podcast/${id}`}>{name}</NavLink></dt>
        <dd><NavLink to={`/podcast/${id}`}>by {author}</NavLink></dd>
      </dl>
      <dl className="podcast-card__description">
        <dt>Description</dt>
        <dd dangerouslySetInnerHTML={{__html: description}} />
      </dl>
    </div>
  )
}

export default styled(PodcastCard)`
  &.podcast-card {
    border-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    padding: 1em;
  }

  .podcast-card__image-container,
  .podcast-card__image-container__image {
    width: 100%;
    padding: 5%;
  }

  .podcast-card__title {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 1em 0;
  }

  dt {
    font-weight: bold;
  }
  dd {
    padding-top: 0.2rem;
    margin-inline-start: 0;
    font-style: oblique;
    font-size: 0.9em;
  }

  .podcast-card__description {}
`;