import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageActions } from '../../store/pageSlice';

import './BackgroundVideo.scss';

function BackgroundVideo(props) {
  const dispatch = useDispatch();
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const isFullScreen = useSelector((store) => store.page.isFullScreen);

  const [canPlay, setCanPlay] = useState(false);

  const videoRef = useRef();

  function canPlayThroughHandler() {
    dispatch(pageActions.doneLoading());
  }

  function canPlayHandler() {
    setCanPlay(true);
  }

  if (videoRef.current && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
    isFullScreen
      ? videoRef.current.webkitEnterFullScreen && videoRef.current.webkitEnterFullScreen()
      : videoRef.current.webkitExitFullScreen && videoRef.current.webkitExitFullScreen();
  }

  if (currentBackground.id !== props.id && !canPlay) {
    return <></>;
  }

  return (
    <video
      ref={videoRef}
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
