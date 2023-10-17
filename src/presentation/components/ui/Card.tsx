import React from 'react';

const Card = ({ children }: any) => {
  return (
    <>
      <div className="card">
        {children}
      </div>
    </>
  )
}

export default Card;