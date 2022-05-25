import { useDispatch, useSelector } from 'react-redux';
import './MoodCard.scss';

import { musicActions } from '../../store/musicSlice';

import playSvg30 from '../../svg/30px/Circled Play.svg';
import pauseSvg30 from '../../svg/30px/Pause Button.svg';

function MoodCard(props) {
  const dispatch = useDispatch();

  const currentMoodId = useSelector((store) => store.music.currentMoodId);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);

  const isMoodPlaying = currentMoodId === props.id && musicPlaying;

  function cardClickHandler() {
    if (!isMoodPlaying) dispatch(musicActions.moodSelectHandler(props.id));
  }

  function playPauseClickHandler() {
    if (isMoodPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    }
  }

  return (
    <div className="mood-card" onClick={cardClickHandler}>
      <img src={props.url} alt="" className="thumbnail"></img>
      <div className="overlay">
        <img src={!isMoodPlaying ? playSvg30 : pauseSvg30} alt="" className="play-pause" onClick={playPauseClickHandler}></img>
        <p className="name">{props.name}</p>
      </div>
    </div>
  );
}

export default MoodCard;
