import React, { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
// import { RequestContext } from '../contexts/RequestContext';
import {useRequest} from "../hooks/request";

function Layout() {
  const { request } = useRequest();
  // const { currentRequestContext: { request } } = useRequestStatus(currentRequestContext);

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Podcaster</Link>
          </li>
        </ul>
        <span>request: {JSON.stringify(request)}</span>
        {/* {request?.loading && (<div>loading: {request?.loading}</div>)} */}
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default Layout;