import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { pageActions } from '../../store/pageSlice';
import './BackgroundVideo.scss';

function BackgroundVideo(props) {
  const dispatch = useDispatch();

  const [canPlay, setCanPlay] = useState(false);

  function canPlayHandler() {
    setCanPlay(true);
    dispatch(pageActions.doneLoading());
  }

  return (
    <video
      style={{ opacity: canPlay ? 1 : 0 }}
      onCanPlay={canPlayHandler}
      autoPlay
      loop
      muted
      preload="auto"
      src={props.url}
      className={`video ${canPlay ? 'can-play' : ''}`}
    ></video>
  );
}

export default BackgroundVideo;
