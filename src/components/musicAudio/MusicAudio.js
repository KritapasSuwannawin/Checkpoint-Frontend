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
  const [currentMusicFilePath, setCurrentMusicFilePath] = useState();

  useEffect(() => {
    storageRef
      .child(currentMusic.filePath)
      .getDownloadURL()
      .then((url) => {
        setMusicURL(url);
        setCurrentMusicFilePath(currentMusic.filePath);

        if (musicPlaying) {
          const playPromise = musicRef.current.play();
          if (playPromise) {
            playPromise.catch(() => {
              return;
            });
          }
        } else {
          musicRef.current.pause();
        }
      });

    if (currentMusic.filePath === currentMusicFilePath) {
      if (musicPlaying) {
        const playPromise = musicRef.current.play();
        if (playPromise) {
          playPromise.catch(() => {
            return;
          });
        }
      } else {
        musicRef.current.pause();
      }
    }

    musicRef.current.volume = musicVolume;
  }, [musicPlaying, musicVolume, currentMusic.filePath, currentMusicFilePath]);

  function audioEndedHandler() {
    dispatch(musicActions.nextMusicHandler());
  }

  function canplayHandler() {
    if (musicPlaying) {
      musicRef.current.play();
    }
  }

  return (
    <audio
      src={musicURL}
      preload="auto"
      loop={loopMusic}
      onCanPlay={canplayHandler}
      onEnded={audioEndedHandler}
      ref={musicRef}
    ></audio>
  );
}

export default MusicAudio;
