import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ambientActions } from '../../store/ambientSlice';

function AmbientAudio(props) {
  const { id, url, volume } = props;

  const dispatch = useDispatch();
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const ambientRef = useRef();

  useEffect(() => {
    ambientRef.current.volume = Number((ambientVolume * volume).toFixed(2));
  }, [ambientVolume, volume]);

  function playAmbientHandler(e) {
    e.target.play().catch((e) => {
      if (e.name === 'NotAllowedError') {
        dispatch(ambientActions.ambientToggleHandler(id));
      }
    });
  }

  function timeUpdateHandler(e) {
    const buffer = 0.44;
    if (e.target.currentTime > e.target.duration - buffer) {
      e.target.currentTime = 0;
    }
  }

  return <audio src={url} onCanPlayThrough={playAmbientHandler} preload="auto" ref={ambientRef} onTimeUpdate={timeUpdateHandler}></audio>;
}

export default AmbientAudio;
