import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import './SimpleThumbnailCard.scss';

function SimpleThumbnailCard(props) {
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const currentBackground = useSelector((store) => store.background.currentBackground);

  const [thumbnailURL, setThumbnailURL] = useState();

  useEffect(() => {
    storageRef
      .child(props.thumbnailFilePath)
      .getDownloadURL()
      .then((url) => {
        setThumbnailURL(url);
      });
  }, [props.thumbnailFilePath]);

  const className = `simple-thumbnail-card ${
    props.ambient
      ? `ambient-card ${
          currentAmbientArr.findIndex((ambient) => ambient.id === props.id) >= 0 ? 'current-ambient' : ''
        }`
      : ''
  } ${props.background ? `background-card ${currentBackground.id === props.id ? 'current-background' : ''}` : ''}`;

  const placeholderClassName =
    'simple-thumbnail-placeholder ' +
    (props.background ? 'background-placeholder' : '') +
    (props.ambient ? 'ambient-placeholder' : '');

  function clickHandler() {
    if (props.background) {
      props.onClickHandler(props.id, props.filePath, props.thumbnailFilePath, props.url);
    } else if (props.ambient) {
      props.onClickHandler(props.id, props.name, props.filePath, props.thumbnailFilePath, props.url);
    }
  }

  if (!thumbnailURL) {
    return <div className={placeholderClassName}></div>;
  }

  return (
    <div className={className}>
      <img src={thumbnailURL} onClick={clickHandler} className="simple-thumbnail-card__image" alt=""></img>
      {props.name && (
        <p onClick={clickHandler} className="simple-thumbnail-card__overlay-name">
          {props.name}
        </p>
      )}
    </div>
  );
}

export default SimpleThumbnailCard;
