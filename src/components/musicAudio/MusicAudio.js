import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import { musicActions } from '../../store/musicSlice';

function MusicAudio(props) {
  const dispatch = useDispatch();
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const loopMusic = useSelector((store) => store.music.loopMusic);

  const musicRef = useRef();

  const [musicURL, setMusicURL] = useState();

  useEffect(() => {
    storageRef
      .child(props.filePath)
      .getDownloadURL()
      .then((url) => {
        setMusicURL(url);
      });

    if (musicPlaying) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }

    musicRef.current.volume = musicVolume;
  }, [musicPlaying, musicVolume, props.filePath]);

  function audioEndedHandler() {
    dispatch(musicActions.nextMusicHandler());
  }

  return (
    <audio
      src={musicURL}
      preload="auto"
      loop={loopMusic}
      autoPlay={musicPlaying}
      onEnded={audioEndedHandler}
      ref={musicRef}
    ></audio>
  );
}

export default MusicAudio;
