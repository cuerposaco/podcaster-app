import React from 'react';

const Header = ({ isLoading = false, titleComponent }) => {
  return (
    <>
      <nav>
        <h1>
          {titleComponent}
        </h1>
        {isLoading && (<div>loading...</div>)}
      </nav>
      <hr />
    </>
  )
}

export default Header;