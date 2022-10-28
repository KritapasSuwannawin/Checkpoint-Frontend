import { useDispatch, useSelector } from 'react-redux';
import './MoodCard.scss';

import { musicActions } from '../../store/musicSlice';

import playSvg from '../../svg/MoodCard/Circled Play.svg';
import pauseSvg from '../../svg/MoodCard/Pause Button.svg';

function MoodCard(props) {
  const { id, musicName, thumbnailUrl } = props;

  const dispatch = useDispatch();

  const currentMoodId = useSelector((store) => store.music.currentMoodId);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);

  const isMoodPlaying = currentMoodId === id && musicPlaying;

  function cardClickHandler() {
    if (!isMoodPlaying) dispatch(musicActions.moodSelectHandler(id));
  }

  function playPauseClickHandler() {
    if (isMoodPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    }
  }

  return (
    <div className="mood-card" onClick={cardClickHandler}>
      <img src={thumbnailUrl} alt="" className="thumbnail"></img>
      <div className="overlay">
        <img src={!isMoodPlaying ? playSvg : pauseSvg} alt="" className="play-pause" onClick={playPauseClickHandler}></img>
        <p className="name">{musicName}</p>
      </div>
    </div>
  );
}

export default MoodCard;
