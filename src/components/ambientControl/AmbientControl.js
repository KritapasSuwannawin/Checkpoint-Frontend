import { useDispatch, useSelector } from 'react-redux';

import './AmbientControl.scss';

import { ambientActions } from '../../store/ambientSlice';

function AmbientControl(props) {
  const { id, name, whiteIconUrl, volume } = props;

  const dispatch = useDispatch();
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);

  function clickHandler() {
    dispatch(ambientActions.ambientToggleHandler(props.id));
  }

  function volumeChangeHandler(e) {
    const volume = e.target.value / 100;
    dispatch(ambientActions.setSpecificAmbientVolume({ volume: volume, id: props.id }));
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
        defaultValue={volume * 100}
        onChange={volumeChangeHandler}
        className="ambient-control__volume-slider"
      ></input>
    </div>
  );
}

export default AmbientControl;
