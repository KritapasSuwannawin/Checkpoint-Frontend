import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AmbientControl.scss';

import { ambientActions } from '../../store/ambientSlice';

function AmbientControl(props) {
  const { id, name, whiteIconUrl } = props;

  const dispatch = useDispatch();
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);

  const sliderRef = useRef();

  useEffect(() => {
    let volume = 0;
    const currentAmbient = currentAmbientArr.find((ambient) => ambient.id === id);

    if (currentAmbient) {
      volume = currentAmbient.volume;
    } else {
      volume = availableAmbientArr.find((ambient) => ambient.id === id).volume;
    }

    sliderRef.current.value = volume * 100;
  }, [availableAmbientArr, currentAmbientArr, id]);

  function clickHandler() {
    dispatch(ambientActions.ambientToggleHandler(id));
  }

  function volumeChangeHandler(e) {
    const volume = e.target.value / 100;
    dispatch(ambientActions.setSpecificAmbientVolume({ id, volume }));
  }

  const isCurrent = currentAmbientArr.findIndex((ambient) => ambient.id === id) !== -1;

  return (
    <div className={`ambient-control ${!isCurrent ? 'not-current-ambient' : ''}`}>
      <div className="ambient-control__ambient-container" onClick={clickHandler}>
        <img src={whiteIconUrl} alt=""></img>
        <p>{name}</p>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        onChange={volumeChangeHandler}
        ref={sliderRef}
        className="ambient-control__volume-slider"
      ></input>
    </div>
  );
}

export default AmbientControl;
