import { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (musicPlaying) {
      musicRef.current.click();
    } else {
      musicRef.current.pause();
    }

    if (currentMusic.url) {
      setMusicURL(currentMusic.url);

      if (musicPlaying) {
        musicRef.current.click();
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
            musicRef.current.click();
          } else {
            musicRef.current.pause();
          }
        });
    }
  }, [musicPlaying, currentMusic]);

  useEffect(() => {
    musicRef.current.volume = musicVolume;
  }, [musicVolume]);

  function audioEndedHandler() {
    dispatch(musicActions.nextMusicHandler());
  }

  function canPlayHandler() {
    if (musicPlaying) {
      musicRef.current.click();
    }
  }

  function clickHandler(e) {
    const playPromise = e.target.play();
    if (playPromise) {
      playPromise.catch((e) => {
        if (e.name === 'NotAllowedError') {
          dispatch(musicActions.setMusicPlaying(false));
        }
      });
    }
  }

  return (
    <audio
      src={musicURL}
      preload="auto"
      loop={loopMusic}
      onCanPlay={canPlayHandler}
      onEnded={audioEndedHandler}
      onClick={clickHandler}
      ref={musicRef}
    ></audio>
  );
}

export default MusicAudio;
