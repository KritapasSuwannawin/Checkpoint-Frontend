import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import { musicActions } from '../../store/musicSlice';

function MusicAudio(props) {
  const dispatch = useDispatch();
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const loopMusic = useSelector((store) => store.music.loopMusic);
  const currentMusic = useSelector((store) => store.music.currentMusic);

  const musicRef = useRef();

  const [musicURL, setMusicURL] = useState();

  const playMusicHandler = useCallback(() => {
    const playPromise = musicRef.current.play();
    if (playPromise) {
      playPromise.catch((e) => {
        if (e.name === 'NotAllowedError') {
          dispatch(musicActions.setMusicPlaying(false));
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentMusic.url) {
      setMusicURL(currentMusic.url);

      if (musicPlaying) {
        playMusicHandler();
      } else {
        musicRef.current.pause();
      }
    } else {
      storageRef
        .child(currentMusic.filePath)
        .getDownloadURL()
        .then((url) => {
          setMusicURL(url);

          if (musicPlaying) {
            playMusicHandler();
          } else {
            musicRef.current.pause();
          }
        });
    }
  }, [musicPlaying, currentMusic, playMusicHandler]);

  useEffect(() => {
    if (musicPlaying) {
      playMusicHandler();
    } else {
      musicRef.current.pause();
    }
  }, [musicPlaying, playMusicHandler]);

  useEffect(() => {
    musicRef.current.volume = musicVolume;
  }, [musicVolume]);

  function audioEndedHandler() {
    dispatch(musicActions.nextMusicHandler());
  }

  function canPlayThroughHandler() {
    if (musicPlaying) {
      playMusicHandler();
    }
  }

  function errorHandler() {
    setTimeout(() => {
      console.log('Error occured during loading', currentMusic.musicName);
      dispatch(musicActions.nextMusicHandler());
    }, 100);
  }

  return (
    <audio
      src={musicURL}
      preload="auto"
      loop={loopMusic}
      onCanPlayThrough={canPlayThroughHandler}
      onEnded={audioEndedHandler}
      onError={errorHandler}
      ref={musicRef}
    ></audio>
  );
}

export default MusicAudio;
