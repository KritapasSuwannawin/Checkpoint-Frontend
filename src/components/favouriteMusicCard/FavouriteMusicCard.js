import { useSelector, useDispatch } from 'react-redux';

import { musicActions } from '../../store/musicSlice';
import './FavouriteMusicCard.scss';

import heartFullSvg25 from '../../svg/25px/Heart.svg';
import playSvg30 from '../../svg/30px/Circled Play.svg';
import pauseSvg30 from '../../svg/30px/Pause Button.svg';

function FavouriteMusicCard(props) {
  const dispatch = useDispatch();
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);

  if (availableMusicArr.length === 0) {
    return <></>;
  }

  const music = availableMusicArr.find((music) => music.id === props.id);

  function playPauseClickHandler() {
    if (musicPlaying && currentMusic.id === props.id) {
      dispatch(musicActions.setMusicPlaying(false));
    } else {
      dispatch(musicActions.changeMusicHandler({ id: props.id }));
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
          src={musicPlaying && currentMusic.id === props.id ? pauseSvg30 : playSvg30}
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
        <img
          src={heartFullSvg25}
          alt=""
          className="favourite-music-card__right--favourite-btn"
          onClick={removeFavouriteMusicHandler}
        ></img>
      </div>
    </div>
  );
}

export default FavouriteMusicCard;
