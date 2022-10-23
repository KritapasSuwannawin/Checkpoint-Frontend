import { useSelector, useDispatch } from 'react-redux';

import { musicActions } from '../../store/musicSlice';
import { popupActions } from '../../store/popupSlice';
import './MusicCard.scss';

import playSvg from '../../svg/MusicCard/Circled Play.svg';
import pauseSvg from '../../svg/MusicCard/Pause Button.svg';
import heartFullSvg from '../../svg/MusicCard/Heart.svg';
import heartSvg from '../../svg/MusicCard/Hearts.svg';

function MusicCard(props) {
  const dispatch = useDispatch();
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const favouriteMusicIdArr = useSelector((store) => store.music.favouriteMusicIdArr);
  const memberId = useSelector((store) => store.member.memberId);

  const isMusicPlaying = currentMusic.id === props.id && musicPlaying;

  function clickHandler() {
    if (this) {
      if (!memberId) {
        dispatch(popupActions.setShowLoginPopup(true));
        return;
      }

      dispatch(musicActions.favouriteBtnClickHandler(props.id));
      return;
    }

    if (!isMusicPlaying) {
      props.onClickHandler(props.id);
    }
  }

  function pauseMusicSpecificHandler() {
    if (isMusicPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    }
  }

  if (!props.thumbnailUrl) {
    return <div className="music-thumbnail-placeholder"></div>;
  }

  const musicName = props.musicName.length > 17 ? props.musicName.slice(0, 15) + '...' : props.musicName;
  const artistName = props.artistName.length > 20 ? props.artistName.slice(0, 18) + '...' : props.artistName;

  return (
    <div className={`music-thumbnail-card ${isMusicPlaying ? 'current-music' : ''}`}>
      <img
        src={favouriteMusicIdArr.includes(props.id) ? heartFullSvg : heartSvg}
        onClick={clickHandler.bind('fav')}
        alt=""
        className="music-thumbnail-card__favourite-btn"
      ></img>
      <img
        src={props.thumbnailUrl}
        onClick={clickHandler}
        className={`music-thumbnail-card__image ${isMusicPlaying ? 'current-music' : ''}`}
        alt=""
      ></img>
      <div onClick={clickHandler} className={`music-thumbnail-card__description ${isMusicPlaying ? 'current-music' : ''}`}>
        <div>
          <p className={`music-thumbnail-card__music-name ${isMusicPlaying ? 'current-music' : ''}`}>{musicName}</p>
          <p className={`music-thumbnail-card__artist-name ${isMusicPlaying ? 'current-music' : ''}`}>{artistName}</p>
        </div>
        <img
          src={isMusicPlaying ? pauseSvg : playSvg}
          alt=""
          onClick={pauseMusicSpecificHandler}
          className={`music-thumbnail-card__play-pause-btn ${isMusicPlaying ? 'current-music' : ''}`}
        ></img>
      </div>
    </div>
  );
}

export default MusicCard;
