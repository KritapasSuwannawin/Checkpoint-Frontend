import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import BackgroundVideo from '../../components/backgroundVideo/BackgroundVideo';
import AmbientAudio from '../../components/ambientAudio/AmbientAudio';
import MusicAudio from '../../components/musicAudio/MusicAudio';
import './Home.scss';

import { pageActions } from '../../store/pageSlice';
import { ambientActions } from '../../store/ambientSlice';
import { musicActions } from '../../store/musicSlice';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import playSvg50 from '../../svg/50px/Circled Play.svg';
import pauseSvg50 from '../../svg/50px/Pause Button.svg';
import profileSvg50 from '../../svg/50px/Test Account.svg';
import moodSvg36 from '../../svg/36px/Frames-1.svg';
import daySvg36 from '../../svg/36px/Sun.svg';
import eveningSvg36 from '../../svg/36px/Sunset.svg';
import nightSvg36 from '../../svg/36px/Moon Symbol.svg';
import cloudySvg36 from '../../svg/36px/Partly Cloudy Day.svg';
import rainySvg36 from '../../svg/36px/Moderate Rain.svg';
import thunderSvg36 from '../../svg/36px/Storm.svg';
import snowySvg36 from '../../svg/36px/Winter.svg';
import heartSvg25 from '../../svg/25px/Heart.svg';
import heartsSvg25 from '../../svg/25px/Hearts.svg';
import shuffleSvg25 from '../../svg/25px/Shuffle.svg';
import loopSvg25 from '../../svg/25px/Repeat.svg';
import backwardSvg25 from '../../svg/25px/Rewind-1.svg';
import forwardSvg25 from '../../svg/25px/Fast Forward-1.svg';
import ambientSvg25 from '../../svg/25px/Organic Food.svg';
import musicSvg25 from '../../svg/25px/iTunes-1.svg';
import speakerSvg15 from '../../svg/15px/Speaker-1.svg';

function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const currentmusic = useSelector((store) => store.music.currentMusic);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const shuffleMusic = useSelector((store) => store.music.shuffleMusic);
  const loopMusic = useSelector((store) => store.music.loopMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const musicVolumeSliderRef = useRef();
  const ambientVolumeSliderRef = useRef();

  const [musicThumbnailURL, setMusicThumbnailURL] = useState();
  const [backgroundArr, setBackgroundArr] = useState([]);
  const [ambientArr, setAmbientArr] = useState([]);

  const [previousMusicVolume, setPreviousMusicVolume] = useState(0.5);
  const [previousAmbientVolume, setPreviousAmbientVolume] = useState(0.5);

  const currentBackgroundFilePath = useRef();
  const [currentMusicThumbnailFilePath, setCurrentMusicThumbnailFilePath] = useState();

  useEffect(() => {
    if (currentBackgroundFilePath.current !== currentBackground.filePath) {
      storageRef
        .child(currentBackground.filePath)
        .getDownloadURL()
        .then((url) => {
          currentBackgroundFilePath.current = currentBackground.filePath;
          setBackgroundArr((backgroundArr) => {
            const poppedBackgroundArr = backgroundArr.filter((background) => background.key !== currentBackground.id);
            return [
              ...poppedBackgroundArr,
              <div key={currentBackground.id}>
                <BackgroundVideo id={currentBackground.id} url={url}></BackgroundVideo>
              </div>,
            ];
          });
        });
    }

    if (currentMusicThumbnailFilePath !== currentmusic.thumbnailFilePath) {
      storageRef
        .child(currentmusic.thumbnailFilePath)
        .getDownloadURL()
        .then((url) => {
          setMusicThumbnailURL(url);
          setCurrentMusicThumbnailFilePath(currentmusic.thumbnailFilePath);
        });
    }

    setAmbientArr(
      currentAmbientArr.map((ambient) => (
        <div key={ambient.id}>
          <AmbientAudio filePath={ambient.filePath}></AmbientAudio>
        </div>
      ))
    );

    return () => {
      setBackgroundArr((backgroundArr) => {
        if (backgroundArr.slice(-1).length === 1) {
          return backgroundArr.slice(-1);
        }
        return backgroundArr;
      });
    };
  }, [currentBackground, currentAmbientArr, currentmusic, currentBackgroundFilePath, currentMusicThumbnailFilePath]);

  function playPauseMusicHandler() {
    dispatch(musicActions.toggleMusicPlayPause());
  }

  function volumeMusicChangeHandler(e) {
    const volume = e.target.value / 100;
    dispatch(musicActions.setMusicVolume(volume));
  }

  function volumeAmbientChangeHandler(e) {
    const volume = e.target.value / 100;
    dispatch(ambientActions.setAmbientVolume(volume));
  }

  function toggleMuteMusicHandler() {
    if (Number(musicVolumeSliderRef.current.value) === 0) {
      setPreviousMusicVolume(0);
      dispatch(musicActions.setMusicVolume(previousMusicVolume));
      musicVolumeSliderRef.current.value = previousMusicVolume * 100;
      return;
    }
    setPreviousMusicVolume(musicVolume);
    dispatch(musicActions.setMusicVolume(0));
    musicVolumeSliderRef.current.value = 0;
  }

  function toggleMuteAmbientHandler() {
    if (Number(ambientVolumeSliderRef.current.value) === 0) {
      setPreviousAmbientVolume(0);
      dispatch(ambientActions.setAmbientVolume(previousAmbientVolume));
      ambientVolumeSliderRef.current.value = previousAmbientVolume * 100;
      return;
    }
    setPreviousAmbientVolume(ambientVolume);
    dispatch(ambientActions.setAmbientVolume(0));
    ambientVolumeSliderRef.current.value = 0;
  }

  function toggleShuffleMusicHandler() {
    dispatch(musicActions.toggleShuffleMusic());
  }

  function toggleLoopMusicHandler() {
    dispatch(musicActions.toggleLoopMusic());
  }

  function backMusicHandler() {
    dispatch(musicActions.backMusicHandler());
  }

  function nextMusicHandler() {
    dispatch(musicActions.nextMusicHandler());
  }

  function backgroundClickHander() {
    dispatch(pageActions.changePageHandler('background'));
  }

  function musicClickHander() {
    dispatch(pageActions.changePageHandler('music'));
  }

  function ambientClickHander() {
    dispatch(pageActions.changePageHandler('ambient'));
  }

  function overlayClickHandler() {
    dispatch(pageActions.closePageHandler());
  }

  return (
    <div className="home">
      <div className={`home__overlay ${currentPage ? 'show-overlay' : ''}`} onClick={overlayClickHandler}></div>
      {backgroundArr}
      <MusicAudio></MusicAudio>
      {ambientArr}
      <nav className="nav">
        <div className="nav__logo">
          <img src={logo50} alt=""></img>
        </div>
        <div className="nav__links">
          <div onClick={backgroundClickHander} className="nav__links--link">
            Background
          </div>
          <div onClick={musicClickHander} className="nav__links--link">
            Music
          </div>
          <div onClick={ambientClickHander} className="nav__links--link">
            Ambient
          </div>
          <img src={heartSvg25} alt=""></img>
          <div className="nav__separator"></div>
          <img src={profileSvg50} alt=""></img>
        </div>
      </nav>
      <div className="player__app-control">
        <div className="player__app-control--section">
          <img src={moodSvg36} alt=""></img>
        </div>
        <div className="player__app-control--section">
          <img src={daySvg36} alt=""></img>
          <img src={eveningSvg36} alt=""></img>
          <img src={nightSvg36} alt=""></img>
        </div>
        <div className="player__app-control--section">
          <img src={cloudySvg36} alt=""></img>
          <img src={rainySvg36} alt=""></img>
          <img src={thunderSvg36} alt=""></img>
          <img src={snowySvg36} alt=""></img>
        </div>
      </div>
      <div className="player">
        <div className="player__music-data">
          <img src={heartsSvg25} alt=""></img>
          <img src={musicThumbnailURL} className="player__music-data--thumbnail" alt=""></img>
          <div>
            <p className="player__music-data--music-name">Music Name</p>
            <p className="player__music-data--artist-name">Artist Name</p>
          </div>
        </div>
        <div className="player__music-control">
          <img
            src={shuffleSvg25}
            onClick={toggleShuffleMusicHandler}
            alt=""
            className={`player__music-control--shuffle ${shuffleMusic ? 'current-song-setting' : ''}`}
          ></img>
          <img src={backwardSvg25} onClick={backMusicHandler} alt="" className="player__music-control--back"></img>
          <img
            src={musicPlaying ? pauseSvg50 : playSvg50}
            onClick={playPauseMusicHandler}
            alt=""
            className="player__music-control--play-pause"
          ></img>
          <img src={forwardSvg25} onClick={nextMusicHandler} alt="" className="player__music-control--next"></img>
          <img
            src={loopSvg25}
            onClick={toggleLoopMusicHandler}
            alt=""
            className={`player__music-control--loop ${loopMusic ? 'current-song-setting' : ''}`}
          ></img>
        </div>
        <div className="player__volume-control">
          <img
            src={ambientSvg25}
            onClick={toggleMuteAmbientHandler}
            className="player__volume-control--mute"
            alt=""
          ></img>
          <img src={musicSvg25} onClick={toggleMuteMusicHandler} className="player__volume-control--mute" alt=""></img>
          <div className="player__volume-control--volume">
            <div>
              <img src={speakerSvg15} alt=""></img>
              <input
                type="range"
                min="0"
                max="100"
                onChange={volumeMusicChangeHandler}
                ref={musicVolumeSliderRef}
                className="player__volume-control--volume-slider"
              ></input>
            </div>
            <div>
              <img src={speakerSvg15} alt=""></img>
              <input
                type="range"
                min="0"
                max="100"
                onChange={volumeAmbientChangeHandler}
                ref={ambientVolumeSliderRef}
                className="player__volume-control--volume-slider"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
