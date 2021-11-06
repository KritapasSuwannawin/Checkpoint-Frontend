import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ambientActions } from '../../store/ambientSlice';

function AmbientAudio(props) {
  const dispatch = useDispatch();
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const ambientRef = useRef();

  const [ambientURL, setAmbientURL] = useState();

  useEffect(() => {
    setAmbientURL(props.url);
  }, [props.url]);

  useEffect(() => {
    ambientRef.current.volume = Number((ambientVolume * props.volume).toFixed(2));
  }, [ambientVolume, props.volume, props.id]);

  function playAmbient() {
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

  function loopAmbient() {
    const buffer = 0.44;
    if (ambientRef.current.currentTime > ambientRef.current.duration - buffer) {
      ambientRef.current.currentTime = 0;
      playAmbient();
    }
  }

  return (
    <audio
      src={ambientURL}
      onCanPlay={playAmbient}
      preload="auto"
      onClick={clickHandler}
      ref={ambientRef}
      onTimeUpdate={loopAmbient}
    ></audio>
  );
}

export default AmbientAudio;
