import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { pageActions } from '../../store/pageSlice';

import './BackgroundVideo.scss';

function BackgroundVideo(props) {
  const dispatch = useDispatch();

  const [canPlay, setCanPlay] = useState(false);

  function canPlayThroughHandler() {
    dispatch(pageActions.doneLoading());
  }

  function canPlayHandler() {
    setCanPlay(true);
  }

  return (
    <video
      onCanPlayThrough={canPlayThroughHandler}
      onCanPlay={canPlayHandler}
      autoPlay
      loop
      muted
      src={props.url}
      className={`video ${canPlay ? 'can-play' : ''}`}
    ></video>
  );
}

export default BackgroundVideo;
