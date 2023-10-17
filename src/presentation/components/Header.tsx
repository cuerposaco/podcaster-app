import React from 'react';
import styled from "styled-components";
import Spinner from './Spinner';

const Header = ({ className, isLoading = false, titleComponent }: any) => {
  return (
    <nav className={className}>
      <h1 className="home-title">
        {titleComponent}
      </h1>
      {isLoading && (<Spinner size="33" border="2"/>)}
    </nav>
  )
}

export default styled(Header)`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;

  .home-title {
    color: dodgerblue;
  }
`;