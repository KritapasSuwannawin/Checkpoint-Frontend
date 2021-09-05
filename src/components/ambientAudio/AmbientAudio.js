import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from '../../firebase/storage';

import { ambientActions } from '../../store/ambientSlice';

function AmbientAudio(props) {
  const dispatch = useDispatch();
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const ambientRef = useRef();

  const [ambientURL, setAmbientURL] = useState();

  useEffect(() => {
    if (props.url) {
      setAmbientURL(props.url);
    } else {
      storageRef
        .child(props.filePath)
        .getDownloadURL()
        .then((url) => {
          setAmbientURL(url);
        });
    }
  }, [props]);

  useEffect(() => {
    ambientRef.current.volume = ambientVolume;
  }, [ambientVolume]);

  function canPlayHandler() {
    ambientRef.current.click();
  }

  function clickHandler(e) {
    const playPromise = e.target.play();
    if (playPromise) {
      playPromise.catch((e) => {
        if (e.name === 'NotAllowedError') {
          dispatch(ambientActions.ambientToggleHandler({ id: props.id }));
        }
      });
    }
  }

  return (
    <audio
      src={ambientURL}
      onCanPlay={canPlayHandler}
      preload="auto"
      loop={true}
      onClick={clickHandler}
      ref={ambientRef}
    ></audio>
  );
}

export default AmbientAudio;
