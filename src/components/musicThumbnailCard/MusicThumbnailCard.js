import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import { musicActions } from '../../store/musicSlice';
import './MusicThumbnailCard.scss';

import playSvg25 from '../../svg/25px/Circled Play.svg';
import pauseSvg25 from '../../svg/25px/Pause Button.svg';

function MusicThumbnailCard(props) {
  const dispatch = useDispatch();
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
    if (!(currentMusic.id === props.id) || !musicPlaying) {
      props.onClickHandler(
        props.id,
        props.musicName,
        props.artistName,
        props.filePath,
        props.thumbnailFilePath,
        props.url,
        props.thumbnailUrl
      );
    }
  }

  function pauseMusicSpecificHandler() {
    if (currentMusic.id === props.id && musicPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    }
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
        <img
          src={currentMusic.id === props.id && musicPlaying ? pauseSvg25 : playSvg25}
          alt=""
          onClick={pauseMusicSpecificHandler}
          className="music-thumbnail-card__play-pause-btn"
        ></img>
      </div>
    </div>
  );
}

export default MusicThumbnailCard;
