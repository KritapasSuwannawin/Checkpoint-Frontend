import { useSelector } from 'react-redux';

import './Loading.scss';

import videoURL from './Checkpoint loading 150px.mp4';

function Loading() {
  const loading = useSelector((store) => store.page.loading);

  return (
    <div className={`loading ${!loading ? 'not-current-page' : ''}`}>
      <video
        autoPlay
        loop
        muted
        preload="auto"
        src={videoURL}
        className={`loading__video ${!loading ? 'not-current-page' : ''}`}
      ></video>
    </div>
  );
}

export default Loading;
