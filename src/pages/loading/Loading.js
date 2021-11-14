import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './Loading.scss';

import videoUrl from './Checkpoint loading 150px.mp4';

function Loading() {
  const loading = useSelector((store) => store.page.loading);

  const [className, setClassName] = useState('');

  useEffect(() => {
    if (!loading) {
      setClassName('not-current-page');

      setTimeout(() => {
        setClassName('shown-behind');
      }, 1000);
    }
  }, [loading]);

  return (
    <div className={`loading ${className}`}>
      <video autoPlay loop muted preload="auto" src={videoUrl} className={`loading__video ${className}`}></video>
    </div>
  );
}

export default Loading;
