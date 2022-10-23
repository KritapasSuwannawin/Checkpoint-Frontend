import { useDispatch, useSelector } from 'react-redux';

import './MusicCategoryCard.scss';

import { musicActions } from '../../store/musicSlice';

import playSvg from '../../svg/MusicCategoryCard/Circled Play.svg';
import pauseSvg from '../../svg/MusicCategoryCard/Pause Button.svg';

function MusicCategoryCard(props) {
  const { category, dataArr, setCategoryHandler } = props;

  const dispatch = useDispatch();
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const musicCategory = useSelector((store) => store.music.musicCategory);

  const isPlaying = musicPlaying && category === musicCategory;

  function playPauseHandler() {
    if (isPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    } else {
      const filteredMusicArr = availableMusicArr.filter((music) => music.category === category);
      const music = filteredMusicArr[Math.floor(Math.random() * filteredMusicArr.length)];

      dispatch(musicActions.changeMusicHandler(music.id));
      dispatch(musicActions.setMusicCategory(category));
    }
  }

  function seeAllClickHandler() {
    setCategoryHandler(category);
  }

  return (
    <div className="music-category-card">
      <div className="music-category-card__top">
        <div className="music-category-card__top--title-container">
          <p className="name">{category}</p>
          <img src={isPlaying ? pauseSvg : playSvg} alt="" className="play-pause-btn" onClick={playPauseHandler}></img>
        </div>
        <div className="music-category-card__top--see-all-btn" onClick={seeAllClickHandler}>
          See All
        </div>
      </div>
      <div className="music-category-card__content">
        <img src={dataArr[0].thumbnailUrl} alt="" className="music-category-card__content--main-thumbnail"></img>
        {dataArr.length >= 3 && (
          <>
            <div className="music-category-card__content--sub-thumbnail-container">
              <img src={dataArr[1].thumbnailUrl} alt=""></img>
              <img src={dataArr[2].thumbnailUrl} alt=""></img>
            </div>
            {dataArr.length === 5 && (
              <div className="music-category-card__content--sub-thumbnail-container">
                <img src={dataArr[3].thumbnailUrl} alt=""></img>
                <img src={dataArr[4].thumbnailUrl} alt=""></img>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MusicCategoryCard;
