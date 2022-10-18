import { useSelector, useDispatch } from 'react-redux';

import { musicActions } from '../../store/musicSlice';
import './FavouriteMusicCard.scss';

import heartFullSvg from '../../svg/FavouriteMusicCard/Heart.svg';
import playSvg from '../../svg/FavouriteMusicCard/Circled Play.svg';
import pauseSvg from '../../svg/FavouriteMusicCard/Pause Button.svg';

function FavouriteMusicCard(props) {
  const dispatch = useDispatch();
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);

  if (availableMusicArr.length === 0) {
    return <></>;
  }

  const music = availableMusicArr.find((music) => music.id === props.id);
  const isMusicPlaying = musicPlaying && currentMusic.id === props.id;

  function playPauseClickHandler() {
    if (isMusicPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    } else {
      dispatch(musicActions.changeMusicHandler(props.id));
      dispatch(musicActions.setPlayFromPlaylist(true));
    }
  }

  function removeFavouriteMusicHandler() {
    dispatch(musicActions.favouriteBtnClickHandler(props.id));
  }

  return (
    <div className="favourite-music-card">
      <div className="favourite-music-card__left">
        <img
          src={isMusicPlaying ? pauseSvg : playSvg}
          alt=""
          className="favourite-music-card__left--play-pause-btn"
          onClick={playPauseClickHandler}
        ></img>
        <img src={music.thumbnailUrl} alt="" className="favourite-music-card__left--thumbnail"></img>
        <div className="favourite-music-card__left--data">
          <p className="favourite-music-card__left--music-name">{music.musicName}</p>
          <p className="favourite-music-card__left--artist-name">{music.artistName}</p>
        </div>
      </div>
      <div className="favourite-music-card__right">
        <p className="favourite-music-card__right--category-name">{music.category}</p>
        <img src={heartFullSvg} alt="" className="favourite-music-card__right--favourite-btn" onClick={removeFavouriteMusicHandler}></img>
      </div>
    </div>
  );
}

export default FavouriteMusicCard;
