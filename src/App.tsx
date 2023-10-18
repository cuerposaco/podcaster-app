import React from 'react';
import { Routes, Route} from "react-router-dom";
import PodcastsPage from './presentation/pages/PodcastsPage';
import LayoutMain from './presentation/pages/layouts/LayoutMain';
import LayoutPodcast from './presentation/pages/layouts/LayoutPodcast';
import PodcastEpisodesPage from './presentation/pages/PodcastEpisodesPage';
import PodcastEpisodeDetailPage from './presentation/pages/PodcastEpisodeDetailPage';
import { RequestProvider } from './presentation/contexts/RequestContext';


function App() {
  return (
    <RequestProvider>
      <Routes>
        <Route
          path="/"
          element={<LayoutMain />}
        >
          <Route index element={<PodcastsPage />} />
          <Route path="/podcast/:podcastId" element={<LayoutPodcast />}>
            <Route index element={<PodcastEpisodesPage />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastEpisodeDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </RequestProvider>
  );
}

export default App;
