import { useDispatch } from 'react-redux';

import SimpleThumbnailCard from '../simpleThumbnailCard/SimpleThumbnailCard';
import './AmbientControl.scss';

import { ambientActions } from '../../store/ambientSlice';

import speakerSvg15 from '../../svg/15px/Speaker-1.svg';

function AmbientControl(props) {
  const dispatch = useDispatch();

  function volumeChangeHandler(e) {
    const volume = e.target.value / 100;
    dispatch(ambientActions.setSpecificAmbientVolume({ volume: volume, id: props.id }));
  }

  return (
    <div className="ambient-control">
      <SimpleThumbnailCard
        id={props.id}
        name={props.name}
        nameJapanese={props.nameJapanese}
        url={props.url}
        thumbnailUrl={props.thumbnailUrl}
        volume={props.volume}
        ambient
      ></SimpleThumbnailCard>
      <img src={speakerSvg15} alt=""></img>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={props.volume * 100}
        onChange={volumeChangeHandler}
        className="ambient-control__volume-slider"
      ></input>
    </div>
  );
}

export default AmbientControl;
