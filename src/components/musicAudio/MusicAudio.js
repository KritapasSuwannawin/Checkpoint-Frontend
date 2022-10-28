import { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { musicActions } from '../../store/musicSlice';

function MusicAudio(props) {
  const dispatch = useDispatch();
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const loopMusic = useSelector((store) => store.music.loopMusic);
  const currentMusic = useSelector((store) => store.music.currentMusic);

  const musicRef = useRef();

  const playMusic = useCallback(() => {
    musicRef.current.play().catch((e) => {
      if (e.name === 'NotAllowedError') {
        dispatch(musicActions.setMusicPlaying(false));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (musicPlaying) {
      playMusic();
    } else {
      musicRef.current.pause();
    }
  }, [musicPlaying, playMusic]);

  useEffect(() => {
    musicRef.current.volume = musicVolume;
  }, [musicVolume]);

  function canPlayHandler() {
    if (musicPlaying) {
      playMusic();
    }
  }

  function audioEndedHandler() {
    dispatch(musicActions.nextMusicHandler());
  }

  function errorHandler() {
    setTimeout(() => {
      dispatch(musicActions.nextMusicHandler());
    }, 100);
  }

  function timeUpdateHandler(e) {
    const buffer = 0.44;
    if (currentMusic.isMood && e.target.currentTime > e.target.duration - buffer) {
      e.target.currentTime = 0;
    }
  }

  return (
    <audio
      src={currentMusic.url}
      preload="auto"
      loop={loopMusic}
      onCanPlayThrough={canPlayHandler}
      onEnded={audioEndedHandler}
      onError={errorHandler}
      onTimeUpdate={timeUpdateHandler}
      ref={musicRef}
    ></audio>
  );
}

export default MusicAudio;
