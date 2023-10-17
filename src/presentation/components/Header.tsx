import React from 'react';
import styled from "styled-components";

const Header = ({ className, isLoading = false, titleComponent }: any) => {
  return (
    <>
      <nav className={className}>
        <h1 className="home-title">
          {titleComponent}
        </h1>
        {isLoading && (<div>loading...</div>)}
      </nav>
      <hr />
    </>
  )
}

export default styled(Header)`
  border-bottom: 1px solid #ddd;
  .home-title {
    color: dodgerblue;
  }
`;