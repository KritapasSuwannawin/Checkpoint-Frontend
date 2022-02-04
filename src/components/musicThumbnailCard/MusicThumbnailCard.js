import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { musicActions } from '../../store/musicSlice';
import './MusicThumbnailCard.scss';

import playSvg25 from '../../svg/25px/Circled Play.svg';
import pauseSvg25 from '../../svg/25px/Pause Button.svg';
import heartFullSvg15 from '../../svg/15px/Heart.svg';
import heartSvg15 from '../../svg/15px/Hearts.svg';

function MusicThumbnailCard(props) {
  const dispatch = useDispatch();
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const favouriteMusicIdArr = useSelector((store) => store.music.favouriteMusicIdArr);
  const isPremium = useSelector((store) => store.member.isPremium);

  const [thumbnailUrl, setThumbnailUrl] = useState();

  useEffect(() => {
    setThumbnailUrl(props.thumbnailUrl);
  }, [props.thumbnailUrl]);

  function clickHandler() {
    if (this) {
      dispatch(musicActions.favouriteBtnClickHandler(props.id));
      return;
    }

    if (!(currentMusic.id === props.id) || !musicPlaying) {
      props.onClickHandler(props.id);
    }
  }

  function pauseMusicSpecificHandler() {
    if (currentMusic.id === props.id && musicPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    }
  }

  if (!thumbnailUrl) {
    return <div className="music-thumbnail-placeholder"></div>;
  }

  const musicName = props.musicName.length > 18 ? props.musicName.slice(0, 16) + '...' : props.musicName;
  const artistName = props.artistName.length > 20 ? props.artistName.slice(0, 18) + '...' : props.artistName;

  return (
    <div className="music-thumbnail-card">
      {isPremium !== undefined && (
        <img
          src={favouriteMusicIdArr.includes(props.id) ? heartFullSvg15 : heartSvg15}
          onClick={clickHandler.bind('fav')}
          alt=""
          className="music-thumbnail-card__favourite-btn"
        ></img>
      )}
      <img src={thumbnailUrl} onClick={clickHandler} className="music-thumbnail-card__image" alt=""></img>
      <div onClick={clickHandler} className="music-thumbnail-card__description">
        <div>
          <p className="music-thumbnail-card__music-name">{musicName}</p>
          <p className="music-thumbnail-card__artist-name">{artistName}</p>
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
