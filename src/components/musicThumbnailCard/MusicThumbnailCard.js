import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import './MusicThumbnailCard.scss';

import heartSvg15 from '../../svg/15px/Heart.svg';
import heartsSvg15 from '../../svg/15px/Hearts.svg';
import playSvg25 from '../../svg/25px/Circled Play.svg';
import pauseSvg25 from '../../svg/25px/Pause Button.svg';

function MusicThumbnailCard(props) {
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);

  const [thumbnailURL, setThumbnailURL] = useState();

  useEffect(() => {
    storageRef
      .child(props.thumbnailFilePath)
      .getDownloadURL()
      .then((url) => {
        setThumbnailURL(url);
      });
  }, [props.thumbnailFilePath]);

  function clickHandler() {
    props.onClickHandler(props.id, props.musicName, props.artistName, props.filePath, props.thumbnailFilePath);
  }

  if (!thumbnailURL) {
    return <div className="music-thumbnail-placeholder"></div>;
  }

  return (
    <div className="music-thumbnail-card">
      <img src={thumbnailURL} onClick={clickHandler} className="music-thumbnail-card__image" alt=""></img>
      <div onClick={clickHandler} className="music-thumbnail-card__description">
        <div>
          <p className="music-thumbnail-card__music-name">{props.musicName}</p>
          <p className="music-thumbnail-card__artist-name">{props.artistName}</p>
        </div>
        <img src={currentMusic.id === props.id && musicPlaying ? pauseSvg25 : playSvg25} alt=""></img>
      </div>
      <img src={heartsSvg15} alt="" className="music-thumbnail-card__favourite-btn"></img>
    </div>
  );
}

export default MusicThumbnailCard;
