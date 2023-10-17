import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useRequest } from "../../hooks/request";
import Header from '../Header';
import styled from 'styled-components';


function Layout({ className }: any) {
  const { request } = useRequest();

  return (
    <div className={className}>
      <Header
        titleComponent={<Link to="/">Podcaster</Link>}
        isLoading={Boolean(request.loading)}
      />
      <main id="container">
        <Outlet />
      </main>
    </div>
  );
}

export default styled(Layout)`
  width: 100%;
  display: flex;
  flex-direction: column;

  #container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;