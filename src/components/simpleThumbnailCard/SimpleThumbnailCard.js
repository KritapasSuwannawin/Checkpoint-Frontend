import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './SimpleThumbnailCard.scss';

import { ambientActions } from '../../store/ambientSlice';
import { backgroundActions } from '../../store/backgroundSlice';

const dictionary = {
  LightRain: ['Light Rain', '小雨'],
  HeavyRain: ['Heavy Rain', '激しい雨'],
  ThunderStorm: ['Thunder Storm', '雷'],
  WindTree: ['Wind Tree', '木のさざめき'],
  River: ['River', '川'],
  BirdPark: ['Bird Park', '公園の鳥'],
  BirdForest: ['Bird Forest', '森の鳥'],
  NightForest: ['Night Forest', '夜の森'],
  LightWind: ['Light Wind', '風のさざめき'],
  WindChimes: ['Wind Chimes', '風鈴'],
};

function SimpleThumbnailCard(props) {
  const dispatch = useDispatch();
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const languageIndex = useSelector((store) => store.language.languageIndex);

  const [thumbnailURL, setThumbnailURL] = useState();

  useEffect(() => {
    setThumbnailURL(props.thumbnailUrl);
  }, [props.thumbnailUrl]);

  const className = `simple-thumbnail-card ${
    props.ambient
      ? `ambient-card ${
          currentAmbientArr.findIndex((ambient) => ambient.id === props.id) >= 0 ? 'current-ambient' : ''
        }`
      : ''
  } ${props.long && props.ambient ? 'long-ambient-card' : ''} ${
    props.background ? `background-card ${currentBackground.id === props.id ? 'current-background' : ''}` : ''
  }`;

  const placeholderClassName =
    'simple-thumbnail-placeholder ' +
    (props.background ? 'background-placeholder' : '') +
    (props.ambient ? 'ambient-placeholder' : '');

  function clickHandler() {
    if (props.background) {
      dispatch(
        backgroundActions.changeBackgroundHandler({
          id: props.id,
        })
      );
    } else if (props.ambient) {
      dispatch(
        ambientActions.ambientToggleHandler({
          id: props.id,
        })
      );
    }
  }

  if (!thumbnailURL) {
    return <div className={placeholderClassName}></div>;
  }

  const ambientDisplayName = props.name && dictionary[props.name.replace(' ', '')][languageIndex];

  return (
    <div className={className}>
      <img src={thumbnailURL} onClick={clickHandler} className="simple-thumbnail-card__image" alt=""></img>
      {props.name && (
        <p onClick={clickHandler} className="simple-thumbnail-card__overlay-name">
          {ambientDisplayName}
        </p>
      )}
    </div>
  );
}

export default SimpleThumbnailCard;
