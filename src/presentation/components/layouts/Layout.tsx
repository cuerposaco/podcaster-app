import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useRequest } from "../../hooks/request";
import Header from '../Header';

function Layout() {
  const { request } = useRequest();

  return (
    <div>
      <Header
        titleComponent={<Link to="/">Podcaster</Link>}
        isLoading={Boolean(request?.loading)}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;