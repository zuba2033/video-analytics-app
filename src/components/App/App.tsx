import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { loadAnalyticsData } from '../../slices/analyticsDataSlice';
import { AppDispatch } from '../../store/store';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const App = () =>  {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAnalyticsData());
  }, [dispatch])

  return (
    <div className="App">
      <div className="wrapper">
        <VideoPlayer/>
      </div>
    </div>
  );
}

export default App;
