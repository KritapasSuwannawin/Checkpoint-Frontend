import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BackgroundVideo from '../../components/backgroundVideo/BackgroundVideo';
import AmbientAudio from '../../components/ambientAudio/AmbientAudio';
import MusicAudio from '../../components/musicAudio/MusicAudio';
import Timer from '../../components/timer/Timer';
import MusicControl from '../../components/musicControl/MusicControl';
import BackgroundControl from '../../components/backgroundControl/BackgroundControl';
import './Home.scss';

import { pageActions } from '../../store/pageSlice';
import { backgroundActions } from '../../store/backgroundSlice';
import { ambientActions } from '../../store/ambientSlice';
import { musicActions } from '../../store/musicSlice';
import { memberActions } from '../../store/memberSlice';
import { avatarActions } from '../../store/avatarSlice';
import { popupActions } from '../../store/popupSlice';
import { deviceActions } from '../../store/deviceSlice';

const logo = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Checkpoint+with+text.svg`;
const playSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Circled+Play.svg`;
const pauseSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Pause+Button.svg`;
const profileSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Profile.svg`;
const daySvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Sun.svg`;
const eveningSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Sunset.svg`;
const nightSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Moon+Symbol.svg`;
const cloudySvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Partly+Cloudy+Day.svg`;
const rainySvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Moderate+Rain.svg`;
const thunderSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Storm.svg`;
const snowySvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Winter.svg`;
const backgroundSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Bg.svg`;
const musicSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Music.svg`;
const timerSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Timer.svg`;
const heartFullSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Heart.svg`;
const heartSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Hearts.svg`;
const ambientSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Organic+Food.svg`;
const iTunesSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/iTunes.svg`;
const fullScreenSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Fullscreen.svg`;
const minimizeSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Minimize.svg`;
const shuffleSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Shuffle.svg`;
const loopSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Repeat.svg`;
const backwardSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Rewind.svg`;
const forwardSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Fast+Forward.svg`;
const tutorialSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Tutorial.svg`;
const downloadSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Download.svg`;
const shareSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Share.svg`;
const discordSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Discord.svg`;
const speakerSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Speaker.svg`;

function Home(props) {
  const { fullScreenClickHander } = props;

  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const isFullScreen = useSelector((store) => store.page.isFullScreen);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const backgroundNotCustomizable = useSelector((store) => store.background.backgroundNotCustomizable);
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const shuffleMusic = useSelector((store) => store.music.shuffleMusic);
  const loopMusic = useSelector((store) => store.music.loopMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const favouriteMusicIdArr = useSelector((store) => store.music.favouriteMusicIdArr);
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);
  const memberId = useSelector((store) => store.member.memberId);
  const currentAvatar = useSelector((store) => store.avatar.currentAvatar);
  const showLoginPopup = useSelector((store) => store.popup.showLoginPopup);
  const showSafariGuidePopup = useSelector((store) => store.popup.showSafariGuidePopup);
  const showTutorialPopup = useSelector((store) => store.popup.showTutorialPopup);

  const musicVolumeSliderRef = useRef();
  const ambientVolumeSliderRef = useRef();

  const [backgroundVideoArr, setBackgroundVideoArr] = useState([]);
  const [ambientAudioArr, setAmbientAudioArr] = useState([]);

  const [previousMusicVolume, setPreviousMusicVolume] = useState(musicVolume);
  const [previousAmbientVolume, setPreviousAmbientVolume] = useState(ambientVolume);

  const [isNotActive, setIsNotActive] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('CheckpointEmail') &&
      localStorage.getItem('CheckpointPassword') &&
      localStorage.getItem('CheckpointLoginMethod')
    ) {
      const requestData = {
        email: localStorage.getItem('CheckpointEmail'),
        password: localStorage.getItem('CheckpointPassword'),
        loginMethod: localStorage.getItem('CheckpointLoginMethod'),
      };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((body) => {
          const { statusCode, data } = body;

          if (statusCode !== 2001) {
            if (statusCode === 4000) {
              throw new Error();
            }

            localStorage.removeItem('CheckpointEmail');
            localStorage.removeItem('CheckpointPassword');
            localStorage.removeItem('CheckpointLoginMethod');

            return;
          }

          const { memberData } = data;
          gtmDataLayerAutoLogin(memberData.id);
          dispatch(memberActions.setMember(memberData));
          dispatch(backgroundActions.changeBackgroundHandler(memberData.backgroundId));
          dispatch(musicActions.setInitialMusic(memberData.musicId));
          dispatch(musicActions.setMusicCategory(memberData.musicCategory));
          dispatch(musicActions.setFavouriteMusicIdArr(memberData.favouriteMusicIdArr));
          dispatch(musicActions.setPlayFromPlaylist(memberData.playFromPlaylist));
          dispatch(avatarActions.changeAvatarHandler(memberData.avatarId));
          dispatch(deviceActions.setNewDevice());
        })
        .catch(() => {});
    }

    let timeout;

    document.addEventListener('mousemove', () => {
      setIsNotActive(false);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsNotActive(true);
      }, 5000);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(ambientActions.setCurrentAmbientArrByIdArr(currentBackground.ambientIdArr));
    dispatch(backgroundActions.setBackgroundNotCustomizable(currentBackground.id.startsWith('Seasonal')));

    setBackgroundVideoArr((backgroundVideoArr) => {
      const filteredBackgroundVideoArr = backgroundVideoArr.filter((background) => background.key !== currentBackground.id);
      return [
        ...filteredBackgroundVideoArr,
        <div key={currentBackground.id}>
          <BackgroundVideo id={currentBackground.id} url={currentBackground.url}></BackgroundVideo>
        </div>,
      ];
    });

    const timeout = setTimeout(() => {
      setBackgroundVideoArr((backgroundVideoArr) => {
        if (backgroundVideoArr.slice(-1).length === 1) {
          return backgroundVideoArr.slice(-1);
        }
        return backgroundVideoArr;
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
      setBackgroundVideoArr((backgroundVideoArr) => {
        if (backgroundVideoArr.slice(-3).length === 3) {
          return backgroundVideoArr.slice(-3);
        }
        return backgroundVideoArr;
      });
    };
  }, [currentBackground, dispatch]);

  useEffect(() => {
    setAmbientAudioArr(
      currentAmbientArr.map((ambient) => {
        return (
          <div key={ambient.id}>
            <AmbientAudio id={ambient.id} url={ambient.url} volume={ambient.volume}></AmbientAudio>
          </div>
        );
      })
    );
  }, [currentAmbientArr]);

  function checkMemberId() {
    if (!memberId) {
      dispatch(popupActions.setShowLoginPopup(true));
      return false;
    }

    return true;
  }

  function gtmDataLayerAutoLogin(userData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'auto-login',
      userId: userData,
    });
  }

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

  function toggleMuteHandler() {
    if (Number(musicVolumeSliderRef.current.value) === 0 && Number(ambientVolumeSliderRef.current.value) === 0) {
      setPreviousMusicVolume(0);
      setPreviousAmbientVolume(0);
      dispatch(musicActions.setMusicVolume(previousMusicVolume));
      dispatch(ambientActions.setAmbientVolume(previousAmbientVolume));
      musicVolumeSliderRef.current.value = previousMusicVolume * 100;
      ambientVolumeSliderRef.current.value = previousAmbientVolume * 100;
      return;
    }

    setPreviousMusicVolume(musicVolume);
    setPreviousAmbientVolume(ambientVolume);
    dispatch(musicActions.setMusicVolume(0));
    dispatch(ambientActions.setAmbientVolume(0));
    musicVolumeSliderRef.current.value = 0;
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
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setShowProfilePopupPopup(false));
    dispatch(pageActions.changePageHandler('background'));
  }

  function musicClickHander() {
    if (currentPage === 'music') {
      dispatch(pageActions.closePageHandler());
      return;
    }
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setShowProfilePopupPopup(false));
    dispatch(pageActions.changePageHandler('music'));
  }

  function logoClickHandler() {
    dispatch(pageActions.closePageHandler());
  }

  function changeBackgroundTimeHandler() {
    dispatch(backgroundActions.changeBackgroundTimeHandler(this));
  }

  function changeBackgroundWeatherHandler() {
    dispatch(backgroundActions.changeBackgroundWeatherHandler(this));
  }

  function ProfilePopupToggleHandler() {
    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setComingSoon());
    dispatch(popupActions.toggleShowProfilePopupPopup());
  }

  function favouriteBtnClickHandler() {
    if (!checkMemberId()) {
      return;
    }

    dispatch(musicActions.favouriteBtnClickHandler(currentMusic.id));
  }

  function closeTimerHandler() {
    dispatch(popupActions.setShowTimerPopup(false));
  }

  function timerClickHandler() {
    if (!checkMemberId()) {
      return;
    }

    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowProfilePopupPopup(false));
    dispatch(popupActions.setComingSoon());
    dispatch(popupActions.toggleShowTimerPopup());
  }

  function showTutorialHandler() {
    dispatch(popupActions.setShowTutorialPopup(true));
  }

  function comingSoonClickHandler() {
    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setShowProfilePopupPopup(false));
    dispatch(popupActions.setComingSoon(this));
  }

  return (
    <div className="home">
      {backgroundVideoArr}
      <MusicAudio></MusicAudio>
      {ambientAudioArr}
      <nav className={`nav ${isFullScreen ? 'hide' : ''}`}>
        <img onClick={logoClickHandler} src={logo} alt="" className="nav__logo"></img>

        <div className="nav__right">
          <div className="nav__right--primary">
            <div onClick={backgroundClickHander} className="link">
              <img src={backgroundSvg} alt="" className="link__icon"></img>
              <p className="link__text">Background</p>
            </div>

            <div onClick={musicClickHander} className="link">
              <img src={musicSvg} alt="" className="link__icon"></img>
              <p className="link__text">Music</p>
            </div>

            <div className="timer-container">
              <div className="link" onClick={timerClickHandler}>
                <img src={timerSvg} alt="" className="link__icon small"></img>
                <p className="link__text">Timer</p>
              </div>
              <Timer closeHandler={closeTimerHandler}></Timer>
            </div>
          </div>

          <div className="nav__right--secondary">
            <img src={tutorialSvg} alt="" className="icon" onClick={showTutorialHandler}></img>
            <img src={downloadSvg} alt="" className="icon" onClick={comingSoonClickHandler.bind('download')}></img>
            <img src={shareSvg} alt="" className="icon" onClick={comingSoonClickHandler.bind('share')}></img>
            <img src={discordSvg} alt="" className="icon" onClick={comingSoonClickHandler.bind('discord')}></img>
          </div>

          <img
            className="nav__right--profile"
            src={memberId ? currentAvatar.url : profileSvg}
            alt=""
            onClick={ProfilePopupToggleHandler}
          ></img>
        </div>
      </nav>
      {(currentPage === 'background' || currentPage === 'ambient') && (
        <BackgroundControl volumeAmbientChangeHandler={volumeAmbientChangeHandler}></BackgroundControl>
      )}
      {currentPage === 'music' && <MusicControl></MusicControl>}
      {!showTutorialPopup && !backgroundNotCustomizable && (
        <div
          className={`mood ${showLoginPopup || showSafariGuidePopup ? 'not-show' : ''} ${isFullScreen ? 'fullscreen' : ''} ${
            isNotActive ? 'not-active' : ''
          }`}
        >
          <div className="mood__section">
            <img
              src={daySvg}
              alt=""
              onClick={changeBackgroundTimeHandler.bind(1)}
              className={currentBackground.id.slice(-2, -1) !== '1' ? 'mood__section--not-current-mood' : ''}
            ></img>
            <img
              src={eveningSvg}
              alt=""
              onClick={changeBackgroundTimeHandler.bind(2)}
              className={currentBackground.id.slice(-2, -1) !== '2' ? 'mood__section--not-current-mood' : ''}
            ></img>
            <img
              src={nightSvg}
              alt=""
              onClick={changeBackgroundTimeHandler.bind(3)}
              className={`${currentBackground.id.slice(-2, -1) !== '3' ? 'mood__section--not-current-mood' : ''}`}
            ></img>
          </div>
          <div className="mood__section">
            <img
              src={cloudySvg}
              alt=""
              onClick={changeBackgroundWeatherHandler.bind(1)}
              className={currentBackground.id.slice(-1) !== '1' ? 'mood__section--not-current-mood' : ''}
            ></img>
            <img
              src={rainySvg}
              alt=""
              onClick={changeBackgroundWeatherHandler.bind(2)}
              className={currentBackground.id.slice(-1) !== '2' ? 'mood__section--not-current-mood' : ''}
            ></img>
            <img
              src={thunderSvg}
              alt=""
              onClick={changeBackgroundWeatherHandler.bind(3)}
              className={`${currentBackground.id.slice(-1) !== '3' ? 'mood__section--not-current-mood' : ''}`}
            ></img>
            <img
              src={snowySvg}
              alt=""
              onClick={changeBackgroundWeatherHandler.bind(4)}
              className={`${currentBackground.id.slice(-1) !== '4' ? 'mood__section--not-current-mood' : ''}`}
            ></img>
          </div>
        </div>
      )}
      <div className={`player ${isFullScreen ? 'hide' : ''}`}>
        <div className="player__music-data">
          {!currentMusic.isMood && (
            <img
              src={favouriteMusicIdArr.includes(currentMusic.id) ? heartFullSvg : heartSvg}
              alt=""
              className="player__music-data--favourite-btn"
              onClick={favouriteBtnClickHandler}
            ></img>
          )}
          <img src={currentMusic.thumbnailUrl} className="player__music-data--thumbnail" alt=""></img>
          <div>
            <p className="player__music-data--music-name">{currentMusic.musicName}</p>
            <a href={currentMusic.artistLink} target="_blank" rel="noreferrer" className="player__music-data--artist-name">
              {currentMusic.artistName}
            </a>
          </div>
        </div>
        <div className="player__music-control">
          {!currentMusic.isMood && (
            <img
              src={shuffleSvg}
              onClick={toggleShuffleMusicHandler}
              alt=""
              className={`player__music-control--shuffle ${shuffleMusic ? 'current-song-setting' : ''}`}
            ></img>
          )}
          <img src={backwardSvg} onClick={backMusicHandler} alt="" className="player__music-control--back"></img>
          <img
            src={musicPlaying ? pauseSvg : playSvg}
            onClick={playPauseMusicHandler}
            alt=""
            className="player__music-control--play-pause"
          ></img>
          <img src={forwardSvg} onClick={nextMusicHandler} alt="" className="player__music-control--next"></img>
          {!currentMusic.isMood && (
            <img
              src={loopSvg}
              onClick={toggleLoopMusicHandler}
              alt=""
              className={`player__music-control--loop ${loopMusic ? 'current-song-setting' : ''}`}
            ></img>
          )}
        </div>
        <div className="player__volume-control">
          <img src={speakerSvg} onClick={toggleMuteHandler} className="player__all-volume" alt=""></img>
          <div className="player__volume-control--volume">
            <div className="player__volume-control--section">
              <img src={iTunesSvg} onClick={toggleMuteMusicHandler} className="player__volume-control--mute" alt=""></img>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume * 100}
                onChange={volumeMusicChangeHandler}
                ref={musicVolumeSliderRef}
                className="player__volume-control--volume-slider"
              ></input>
            </div>
            <div className="player__volume-control--section">
              <img src={ambientSvg} onClick={toggleMuteAmbientHandler} className="player__volume-control--mute" alt=""></img>
              <input
                type="range"
                min="0"
                max="100"
                value={ambientVolume * 100}
                onChange={volumeAmbientChangeHandler}
                ref={ambientVolumeSliderRef}
                className="player__volume-control--volume-slider"
              ></input>
            </div>
          </div>
          <img
            src={!isFullScreen ? fullScreenSvg : minimizeSvg}
            onClick={fullScreenClickHander}
            className="player__full-screen"
            alt=""
          ></img>
        </div>
      </div>
      {isFullScreen && (
        <img
          src={!isFullScreen ? fullScreenSvg : minimizeSvg}
          onClick={fullScreenClickHander}
          className={`player__full-screen fullscreen ${isNotActive ? 'not-active' : ''}`}
          alt=""
        ></img>
      )}
    </div>
  );
}

export default Home;
