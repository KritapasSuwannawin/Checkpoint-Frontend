import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from '../../firebase/storage';
import BackgroundVideo from '../../components/backgroundVideo/BackgroundVideo';
import AmbientAudio from '../../components/ambientAudio/AmbientAudio';
import MusicAudio from '../../components/musicAudio/MusicAudio';
import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Home.scss';

import { pageActions } from '../../store/pageSlice';
import { backgroundActions } from '../../store/backgroundSlice';
import { ambientActions } from '../../store/ambientSlice';
import { musicActions } from '../../store/musicSlice';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import playSvg50 from '../../svg/50px/Circled Play.svg';
import pauseSvg50 from '../../svg/50px/Pause Button.svg';
import profileSvg50 from '../../svg/50px/Test Account.svg';
import daySvg36 from '../../svg/36px/Sun.svg';
import eveningSvg36 from '../../svg/36px/Sunset.svg';
import nightSvg36 from '../../svg/36px/Moon Symbol.svg';
import cloudySvg36 from '../../svg/36px/Partly Cloudy Day.svg';
import rainySvg36 from '../../svg/36px/Moderate Rain.svg';
import thunderSvg36 from '../../svg/36px/Storm.svg';
import snowySvg36 from '../../svg/36px/Winter.svg';
import shuffleSvg25 from '../../svg/25px/Shuffle.svg';
import loopSvg25 from '../../svg/25px/Repeat.svg';
import backwardSvg25 from '../../svg/25px/Rewind-1.svg';
import forwardSvg25 from '../../svg/25px/Fast Forward-1.svg';
import ambientSvg25 from '../../svg/25px/Organic Food.svg';
import musicSvg25 from '../../svg/25px/iTunes-1.svg';
import musicLibrarySvg25 from '../../svg/25px/MusicLibrary25px.svg';
import addSvg20 from '../../svg/20px/Add20px.svg';

function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const shuffleMusic = useSelector((store) => store.music.shuffleMusic);
  const loopMusic = useSelector((store) => store.music.loopMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const musicVolumeSliderRef = useRef();
  const ambientVolumeSliderRef = useRef();

  const [musicThumbnailURL, setMusicThumbnailURL] = useState();
  const [backgroundThumbnailURL, setBackgroundThumbnailURL] = useState();
  const [backgroundVideoArr, setBackgroundVideoArr] = useState([]);
  const [ambientAudioArr, setAmbientAudioArr] = useState([]);
  const [ambientThumbnailArr, setAmbientThumbnailArr] = useState([]);

  const [previousMusicVolume, setPreviousMusicVolume] = useState(musicVolume);
  const [previousAmbientVolume, setPreviousAmbientVolume] = useState(ambientVolume);

  const currentBackgroundFilePath = useRef();
  const currentAmbientIDArr = useRef();
  const currentMusicThumbnailFilePath = useRef();
  const currentAmbientArrRef = useRef();
  const availableAmbientArrRef = useRef();

  useEffect(() => {
    if (currentBackgroundFilePath.current !== currentBackground.filePath) {
      if (currentBackground.url) {
        currentBackgroundFilePath.current = currentBackground.filePath;
        setBackgroundVideoArr((backgroundVideoArr) => {
          const filteredBackgroundVideoArr = backgroundVideoArr.filter(
            (background) => background.key !== currentBackground.id
          );
          return [
            ...filteredBackgroundVideoArr,
            <div key={currentBackground.id}>
              <BackgroundVideo id={currentBackground.id} url={currentBackground.url}></BackgroundVideo>
            </div>,
          ];
        });
      } else {
        storageRef
          .child(currentBackground.filePath)
          .getDownloadURL()
          .then((url) => {
            currentBackgroundFilePath.current = currentBackground.filePath;
            setBackgroundVideoArr((backgroundVideoArr) => {
              const filteredBackgroundVideoArr = backgroundVideoArr.filter(
                (background) => background.key !== currentBackground.id
              );
              return [
                ...filteredBackgroundVideoArr,
                <div key={currentBackground.id}>
                  <BackgroundVideo id={currentBackground.id} url={url}></BackgroundVideo>
                </div>,
              ];
            });
          });
      }

      if (currentBackground.thumbnailUrl) {
        setBackgroundThumbnailURL(currentBackground.thumbnailUrl);
      } else {
        storageRef
          .child(currentBackground.thumbnailFilePath)
          .getDownloadURL()
          .then((url) => {
            setBackgroundThumbnailURL(url);
          });
      }
    }

    if (
      JSON.stringify(currentAmbientIDArr.current) !== JSON.stringify(currentBackground.ambientArr) ||
      JSON.stringify(availableAmbientArrRef.current) !== JSON.stringify(availableAmbientArr)
    ) {
      currentAmbientIDArr.current = currentBackground.ambientArr;
      availableAmbientArrRef.current = availableAmbientArr;
      setAmbientThumbnailArr([]);

      currentBackground.ambientArr.forEach((ambientID) => {
        const ambient = availableAmbientArr.find((ambient) => ambient.id === ambientID);

        setAmbientThumbnailArr((ambientThumbnailArr) => {
          return [
            ...ambientThumbnailArr,
            <div key={ambient.id} style={{ width: 'calc(50% - 0.5rem)' }}>
              <SimpleThumbnailCard
                id={ambient.id}
                name={ambient.name}
                filePath={ambient.filePath}
                thumbnailFilePath={ambient.thumbnailFilePath}
                url={ambient.url}
                thumbnailUrl={ambient.thumbnailUrl}
                ambient
                short
              ></SimpleThumbnailCard>
            </div>,
          ];
        });
      });
      dispatch(ambientActions.setCurrentAmbientArrByIDArr(currentBackground.ambientArr));
    }

    if (currentMusicThumbnailFilePath.current !== currentMusic.thumbnailFilePath) {
      if (currentMusic.thumbnailUrl) {
        setMusicThumbnailURL(currentMusic.thumbnailUrl);
        currentMusicThumbnailFilePath.current = currentMusic.thumbnailFilePath;
      } else {
        storageRef
          .child(currentMusic.thumbnailFilePath)
          .getDownloadURL()
          .then((url) => {
            setMusicThumbnailURL(url);
            currentMusicThumbnailFilePath.current = currentMusic.thumbnailFilePath;
          });
      }
    }

    if (JSON.stringify(currentAmbientArrRef.current) !== JSON.stringify(currentAmbientArr)) {
      currentAmbientArrRef.current = currentAmbientArr;
      setAmbientAudioArr(
        currentAmbientArr.map((ambient) => {
          return (
            <div key={ambient.id}>
              <AmbientAudio id={ambient.id} filePath={ambient.filePath} url={ambient.url}></AmbientAudio>
            </div>
          );
        })
      );
    }

    return () => {
      setBackgroundVideoArr((backgroundVideoArr) => {
        if (backgroundVideoArr.slice(-1).length === 1) {
          return backgroundVideoArr.slice(-1);
        }
        return backgroundVideoArr;
      });
    };
  }, [
    currentBackground,
    availableAmbientArr,
    currentAmbientArr,
    currentMusic,
    currentBackgroundFilePath,
    currentMusicThumbnailFilePath,
    dispatch,
  ]);

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
    if (currentPage === 'background' || currentPage === 'ambient') {
      dispatch(pageActions.closePageHandler());
      return;
    }
    dispatch(pageActions.changePageHandler('background'));
  }

  function musicClickHander() {
    if (currentPage === 'music') {
      dispatch(pageActions.closePageHandler());
      return;
    }
    dispatch(pageActions.changePageHandler('music'));
  }

  function openAmbientPageHander() {
    dispatch(pageActions.changePageHandler('ambient'));
  }

  function openBackgroundPageHander() {
    dispatch(pageActions.changePageHandler('background'));
  }

  function overlayClickHandler() {
    dispatch(pageActions.closePageHandler());
  }

  function changeBackgroundTimeHandler() {
    dispatch(backgroundActions.changeBackgroundTimeHandler(this));
  }

  function changeBackgroundWeatherHandler() {
    dispatch(backgroundActions.changeBackgroundWeatherHandler(this));
  }

  return (
    <div className="home">
      <div className={`home__overlay ${currentPage ? 'show-overlay' : ''}`}>
        <div
          className={`home__overlay--left ${currentPage === 'music' ? 'wide' : ''}`}
          onClick={overlayClickHandler}
        ></div>
        <div className={`home__overlay--right ${currentPage === 'music' ? 'wide' : ''}`}></div>
      </div>
      {backgroundVideoArr}
      <MusicAudio></MusicAudio>
      {ambientAudioArr}
      <nav className="nav">
        <div onClick={overlayClickHandler} className="nav__logo">
          <img src={logo50} alt=""></img>
        </div>
        <div className="nav__links">
          <div
            onClick={musicClickHander}
            className={`nav__links--link ${currentPage === 'music' ? 'current-page' : ''}`}
          >
            Music
          </div>
          <div
            onClick={backgroundClickHander}
            className={`nav__links--link fixed-width ${
              currentPage === 'background' || currentPage === 'ambient' ? 'current-page' : ''
            }`}
          >
            Background
          </div>
          <div className="nav__separator"></div>
          <img src={profileSvg50} alt=""></img>
        </div>
      </nav>
      <div
        className={`background-control ${
          currentPage === 'background' || currentPage === 'ambient' ? 'show-control' : ''
        }`}
      >
        <img
          src={backgroundThumbnailURL}
          alt=""
          onClick={openBackgroundPageHander}
          className="background-control__thumbnail"
        ></img>
        <div className="background-control__ambient-container">
          {ambientThumbnailArr}
          <div onClick={openAmbientPageHander} className="background-control__add-ambient">
            <img src={addSvg20} alt=""></img>
          </div>
        </div>
      </div>
      <div className={`music-control ${currentPage === 'music' ? 'show-control' : ''}`}>Comming soon...</div>
      <div className="mood">
        <div className="mood--section">
          <img src={daySvg36} alt="" onClick={changeBackgroundTimeHandler.bind(1)}></img>
          <img src={eveningSvg36} alt="" onClick={changeBackgroundTimeHandler.bind(2)}></img>
          <img src={nightSvg36} alt="" onClick={changeBackgroundTimeHandler.bind(3)}></img>
        </div>
        <div className="mood--section">
          <img src={cloudySvg36} alt="" onClick={changeBackgroundWeatherHandler.bind(1)}></img>
          <img src={rainySvg36} alt="" onClick={changeBackgroundWeatherHandler.bind(2)}></img>
          <img src={thunderSvg36} alt="" onClick={changeBackgroundWeatherHandler.bind(3)}></img>
          <img src={snowySvg36} alt="" onClick={changeBackgroundWeatherHandler.bind(4)}></img>
        </div>
      </div>
      <div className="player">
        <div className="player__music-data">
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
          <img src={musicLibrarySvg25} onClick={musicClickHander} className="player__music-playlist" alt=""></img>
          <div className="player__volume-control--volumn">
            <div className="player__volume-control--section">
              <img
                src={musicSvg25}
                onClick={toggleMuteMusicHandler}
                className="player__volume-control--mute"
                alt=""
              ></img>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue={musicVolume * 100}
                onChange={volumeMusicChangeHandler}
                ref={musicVolumeSliderRef}
                className="player__volume-control--volume-slider"
              ></input>
            </div>
            <div className="player__volume-control--section">
              <img
                src={ambientSvg25}
                onClick={toggleMuteAmbientHandler}
                className="player__volume-control--mute"
                alt=""
              ></img>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue={ambientVolume * 100}
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
