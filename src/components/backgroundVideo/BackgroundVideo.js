import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSafari } from 'react-device-detect';

import { pageActions } from '../../store/pageSlice';

import './BackgroundVideo.scss';

function BackgroundVideo(props) {
  const dispatch = useDispatch();
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const isFullScreen = useSelector((store) => store.page.isFullScreen);
  const currentPage = useSelector((store) => store.page.currentPage);

  const [canPlay, setCanPlay] = useState(false);

  const videoRef = useRef();

  function canPlayThroughHandler() {
    dispatch(pageActions.doneLoading());
  }

  function canPlayHandler() {
    setCanPlay(true);
  }

  if (videoRef.current && isSafari) {
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
      className={`video ${canPlay ? 'can-play' : ''} ${currentPage ? 'darken' : ''}`}
    ></video>
  );
}

export default BackgroundVideo;
