import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './Loading.scss';

const videoUrl = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Checkpoint+loading+150px.mp4`;

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
