import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageActions } from '../../store/pageSlice';

import './BackgroundVideo.scss';

function BackgroundVideo(props) {
  const dispatch = useDispatch();
  const currentBackground = useSelector((store) => store.background.currentBackground);

  const [canPlay, setCanPlay] = useState(false);

  function canPlayThroughHandler() {
    dispatch(pageActions.doneLoading());
  }

  function canPlayHandler() {
    setCanPlay(true);
  }

  if (currentBackground.id !== props.id && !canPlay) {
    return <></>;
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
