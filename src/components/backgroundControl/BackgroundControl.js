import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AmbientControl from '../../components/ambientControl/AmbientControl';
import './BackgroundControl.scss';

import { pageActions } from '../../store/pageSlice';

import addSvg from '../../svg/BackgroundControl/Add.svg';
import speakerSvg from '../../svg/BackgroundControl/Speaker.svg';

function BackgroundControl(props) {
  const dispatch = useDispatch();
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const [ambientThumbnailArr, setAmbientThumbnailArr] = useState([]);

  useEffect(() => {
    const currentAmbientIdArr = currentBackground.ambientIdArr;

    const ambientThumbnailArr1 = [];
    currentAmbientIdArr.forEach((ambientId) => {
      const ambient = availableAmbientArr.find((ambient) => ambient.id === ambientId);
      ambientThumbnailArr1.push(
        <div key={ambient.id} className="background-control__ambient-control">
          <AmbientControl id={ambient.id} name={ambient.name} whiteIconUrl={ambient.whiteIconUrl}></AmbientControl>
        </div>
      );
    });

    const ambientThumbnailArr2 = [];
    const filteredCurrentAmbientArr = currentAmbientArr.filter((ambient) => !currentAmbientIdArr.includes(ambient.id));
    filteredCurrentAmbientArr.forEach((ambient) => {
      ambientThumbnailArr2.push(
        <div key={ambient.id} className="background-control__ambient-control">
          <AmbientControl id={ambient.id} name={ambient.name} whiteIconUrl={ambient.whiteIconUrl}></AmbientControl>
        </div>
      );
    });

    setAmbientThumbnailArr(ambientThumbnailArr1.concat(ambientThumbnailArr2));
  }, [availableAmbientArr, currentBackground, currentAmbientArr]);

  function openAmbientPageHander() {
    dispatch(pageActions.changePageHandler('ambient'));
  }

  function openBackgroundPageHander() {
    dispatch(pageActions.changePageHandler('background'));
  }

  return (
    <div className="background-control">
      <img src={currentBackground.thumbnailUrl} alt="" onClick={openBackgroundPageHander} className="background-control__thumbnail"></img>
      <div className="background-control__ambient-container">
        <div className="background-control__ambient-volume">
          <p>Ambience</p>
          <img src={speakerSvg} alt=""></img>
          <input
            type="range"
            min="0"
            max="100"
            value={ambientVolume * 100}
            onChange={props.volumeAmbientChangeHandler}
            className="background-control__ambient-volume--slider"
          ></input>
        </div>
        {ambientThumbnailArr}
        <div onClick={openAmbientPageHander} className={'background-control__add-ambient'}>
          <img src={addSvg} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default BackgroundControl;
