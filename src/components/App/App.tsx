import React from 'react';
import './App.css';

import AnalyticsDataList from '../analyticsDataList/AnalyticsDataList';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const App = () =>  {

  return (
    <div className="App">
      <div className="wrapper">
        <VideoPlayer/>
        <AnalyticsDataList/>
      </div>
    </div>
  );
}

export default App;
