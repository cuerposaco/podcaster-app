import React from 'react';
import { Routes, Route} from "react-router-dom";
import Home from './presentation/pages/Home';
import Layout from './presentation/components/Layout';
import LayoutPodcast from './presentation/components/LayoutPodcast';
import PodcastEpisodesDetail from './presentation/pages/PodcastEpisodesDetail';
import PodcastEpisodeDetail from './presentation/pages/PodcastEpisodeDetail';
import { RequestProvider } from './presentation/contexts/RequestContext';


function App() {
  return (
    <RequestProvider>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route index element={<Home />} />
          <Route path="/podcast/:podcastId" element={<LayoutPodcast />}>
            <Route index element={<PodcastEpisodesDetail />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastEpisodeDetail />} />
          </Route>
        </Route>
          {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </RequestProvider>
  );
}

export default App;
