import React from 'react';

const PodcastCard = ({ name, description, image }) => {
  return (
    <>
      <div className="podcast-card">
        <img src={image} alt={name}/>
        <hr />
        {name}
        <hr />
        Description:
        <div dangerouslySetInnerHTML={{__html: description}} />
      </div>
    </>
  )
}

export default PodcastCard;