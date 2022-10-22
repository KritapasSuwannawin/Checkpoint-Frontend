import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BackgroundVideo from '../../components/backgroundVideo/BackgroundVideo';
import AmbientAudio from '../../components/ambientAudio/AmbientAudio';
import MusicAudio from '../../components/musicAudio/MusicAudio';
import AmbientControl from '../../components/ambientControl/AmbientControl';
import FavouriteMusicCard from '../../components/favouriteMusicCard/FavouriteMusicCard';
import Timer from '../../components/timer/Timer';
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
const musicLibrarySvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Music+Library.svg`;
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
const addSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Add.svg`;
const signInSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/SignIn.svg`;
const questionMarkSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Question+Mark.svg`;
const paperPlaneSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Paper Plane.svg`;
const informationIconSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Information+Icon.svg`;
const checkpointLogoSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Checkpoint+Logo.svg`;
const policySvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Policy.svg`;
const logoutSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Logout.svg`;
const speakerSvg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/svg/Home/Speaker.svg`;

function Home(props) {
  const { fullScreenClickHander } = props;

  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const isFullScreen = useSelector((store) => store.page.isFullScreen);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicVolume = useSelector((store) => store.music.musicVolume);
  const shuffleMusic = useSelector((store) => store.music.shuffleMusic);
  const loopMusic = useSelector((store) => store.music.loopMusic);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const favouriteMusicIdArr = useSelector((store) => store.music.favouriteMusicIdArr);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);
  const memberId = useSelector((store) => store.member.memberId);
  const username = useSelector((store) => store.member.username);
  const currentAvatar = useSelector((store) => store.avatar.currentAvatar);
  const showTimerPopup = useSelector((store) => store.popup.showTimerPopup);
  const showOutsideLinkPopup = useSelector((store) => store.popup.showOutsideLinkPopup);
  const showLoginPopup = useSelector((store) => store.popup.showLoginPopup);
  const showSafariGuidePopup = useSelector((store) => store.popup.showSafariGuidePopup);

  const musicVolumeSliderRef = useRef();
  const ambientVolumeSliderRef = useRef();

  const [musicThumbnailUrl, setMusicThumbnailUrl] = useState();
  const [backgroundThumbnailUrl, setBackgroundThumbnailUrl] = useState();
  const [backgroundVideoArr, setBackgroundVideoArr] = useState([]);
  const [ambientAudioArr, setAmbientAudioArr] = useState([]);
  const [ambientThumbnailArr, setAmbientThumbnailArr] = useState([]);

  const [previousMusicVolume, setPreviousMusicVolume] = useState(musicVolume);
  const [previousAmbientVolume, setPreviousAmbientVolume] = useState(ambientVolume);

  const backgroundFilePathRef = useRef();

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
  }, [dispatch]);

  useEffect(() => {
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
  }, [currentBackground]);

  useEffect(() => {
    setBackgroundThumbnailUrl(currentBackground.thumbnailUrl);
  }, [currentBackground]);

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

  useEffect(() => {
    setMusicThumbnailUrl(currentMusic.thumbnailUrl);
  }, [currentMusic]);

  useEffect(() => {
    const currentAmbientIdArr = currentBackground.ambientIdArr;

    if (backgroundFilePathRef.current !== currentBackground.filePath) {
      backgroundFilePathRef.current = currentBackground.filePath;
      setAmbientThumbnailArr([]);

      currentAmbientIdArr.forEach((ambientId) => {
        const ambient = availableAmbientArr.find((ambient) => ambient.id === ambientId);

        setAmbientThumbnailArr((ambientThumbnailArr) => {
          return [
            ...ambientThumbnailArr,
            <div key={ambient.id} className="background-control__ambient-control">
              <AmbientControl
                id={ambient.id}
                name={ambient.name}
                nameJapanese={ambient.nameJapanese}
                url={ambient.url}
                thumbnailUrl={ambient.thumbnailUrl}
                volume={ambient.volume}
              ></AmbientControl>
            </div>,
          ];
        });
      });

      dispatch(ambientActions.setCurrentAmbientArrByIdArr(currentAmbientIdArr));
    }

    const ambientThumbnailArr2 = [];
    const filteredCurrentAmbientArr = currentAmbientArr.filter((ambient) => !currentAmbientIdArr.includes(ambient.id));
    filteredCurrentAmbientArr.forEach((ambient) => {
      ambientThumbnailArr2.push(
        <div key={ambient.id} className="background-control__ambient-control">
          <AmbientControl
            id={ambient.id}
            name={ambient.name}
            url={ambient.url}
            thumbnailUrl={ambient.thumbnailUrl}
            volume={ambient.volume}
          ></AmbientControl>
        </div>
      );
    });

    setAmbientThumbnailArr((ambientThumbnailArr) => ambientThumbnailArr.slice(0, currentAmbientIdArr.length).concat(ambientThumbnailArr2));
  }, [availableAmbientArr, currentBackground, currentAmbientArr, dispatch]);

  function checkMemberId() {
    if (!memberId) {
      dispatch(popupActions.setShowLoginPopup(true));
      return false;
    }

    return true;
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
    dispatch(popupActions.setShowOutsideLinkPopup(false));
    dispatch(pageActions.changePageHandler('background'));
  }

  function musicClickHander() {
    if (currentPage === 'music') {
      dispatch(pageActions.closePageHandler());
      return;
    }
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setShowOutsideLinkPopup(false));
    dispatch(pageActions.changePageHandler('music'));
  }

  function openAmbientPageHander() {
    dispatch(pageActions.changePageHandler('ambient'));
  }

  function openBackgroundPageHander() {
    dispatch(pageActions.changePageHandler('background'));
  }

  function openAvatarPageHander() {
    dispatch(pageActions.changePageHandler('avatar'));
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

  function outsideLinkToggleHandler() {
    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.toggleShowOutsideLinkPopup());
  }

  function favouriteBtnClickHandler() {
    if (!checkMemberId()) {
      return;
    }

    dispatch(musicActions.favouriteBtnClickHandler(currentMusic.id));
  }

  function logoutHandler() {
    localStorage.removeItem('CheckpointEmail');
    localStorage.removeItem('CheckpointPassword');
    localStorage.removeItem('CheckpointLoginMethod');

    dispatch(deviceActions.clearDevice());
    dispatch(pageActions.closePageHandler());
    dispatch(musicActions.setMusicPlaying(false));
    dispatch(musicActions.setFavouriteMusicIdArr([]));
    dispatch(avatarActions.changeAvatarHandler(1));
    dispatch(popupActions.setShowOutsideLinkPopup(false));
    dispatch(backgroundActions.changeBackgroundHandler('Anime_BG0211'));
    dispatch(memberActions.logout());
  }

  function loginHandler() {
    dispatch(popupActions.setShowLoginPopup(true));
  }

  function openHelpSupportHandler() {
    dispatch(popupActions.setShowHelpSupportPopup(true));
    dispatch(popupActions.setShowActivationPopup(false));
  }

  function openFeedbackHandler() {
    dispatch(popupActions.setShowFeedbackPopup(true));
  }

  function closeTimerHandler() {
    dispatch(popupActions.setShowTimerPopup(false));
  }

  function timerClickHandler() {
    if (!checkMemberId()) {
      return;
    }

    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowOutsideLinkPopup(false));
    dispatch(popupActions.toggleShowTimerPopup());
  }

  function showTutorialHandler() {
    dispatch(popupActions.setShowTutorialPopup(true));
  }

  return (
    <div className="home">
      {backgroundVideoArr}
      <MusicAudio></MusicAudio>
      {ambientAudioArr}
      {!isFullScreen && (
        <>
          <div className={`home__overlay ${currentPage && currentPage !== 'avatar' ? 'show-overlay' : ''}`}>
            <div className="home__overlay--left" onClick={overlayClickHandler}></div>
            <div className="home__overlay--right"></div>
          </div>
        </>
      )}
      <nav className="nav">
        {!isFullScreen && (
          <>
            <div onClick={overlayClickHandler} className="nav__logo">
              <img src={logo} alt="" className="nav__logo--img"></img>
            </div>
          </>
        )}
        <div className="nav__links">
          {!isFullScreen && (
            <div onClick={showTutorialHandler} className="nav__links--link nav-tutorial">
              Tutorial
            </div>
          )}
          <div className="nav__links--timer-container">
            {!isFullScreen && (
              <div onClick={timerClickHandler} className="nav__links--link nav-timer">
                <img src={timerSvg} alt="" className="nav__links--icon small"></img>
                Timer
              </div>
            )}
            <Timer closeHandler={closeTimerHandler} showTimer={showTimerPopup}></Timer>
          </div>
          {!isFullScreen && (
            <>
              <div onClick={musicClickHander} className={`nav__links--link ${currentPage === 'music' ? 'current-page' : ''}`}>
                <img src={musicSvg} alt="" className="nav__links--icon"></img>
                Music
              </div>
              <div
                onClick={backgroundClickHander}
                className={`nav__links--link ${currentPage === 'background' || currentPage === 'ambient' ? 'current-page' : ''}`}
              >
                <img src={backgroundSvg} alt="" className="nav__links--icon"></img>
                Background
              </div>
              <img
                className={`nav__links--link profile ${memberId ? 'premium' : ''}`}
                src={memberId ? currentAvatar.url : profileSvg}
                alt=""
                onClick={outsideLinkToggleHandler}
              ></img>
            </>
          )}
          {showOutsideLinkPopup && (
            <div className="nav__outside-links">
              {memberId && (
                <>
                  <div className="nav__outside-links--profile-container">
                    <img src={currentAvatar.url} className={`${memberId ? 'premium' : ''}`} alt="" onClick={openAvatarPageHander}></img>
                    <div>
                      <p className="nav__outside-links--username">{username}</p>
                      <p className="nav__outside-links--member-id">{`#${memberId}`}</p>
                    </div>
                  </div>
                  <div className="nav__outside-links--container border-top">
                    <div className="nav__outside-links--icon-container">
                      <img src={questionMarkSvg} alt=""></img>
                    </div>
                    <p onClick={openHelpSupportHandler}>Help & Support</p>
                  </div>
                  <div className="nav__outside-links--container">
                    <div className="nav__outside-links--icon-container">
                      <img src={paperPlaneSvg} alt=""></img>
                    </div>
                    <p onClick={openFeedbackHandler}>Feedback</p>
                  </div>
                </>
              )}
              <div className="nav__outside-links--container">
                <div className="nav__outside-links--icon-container">
                  <img src={informationIconSvg} alt=""></img>
                </div>
                <a href={`${window.location.href}about`} target="_blank" rel="noreferrer">
                  About Us
                </a>
              </div>
              <div className="nav__outside-links--container">
                <div className="nav__outside-links--icon-container">
                  <img src={policySvg} alt=""></img>
                </div>
                <a href={'https://forms.gle/rCnXynzSeH8WhMRC9'} target="_blank" rel="noreferrer">
                  For Artist
                </a>
              </div>
              <div className="nav__outside-links--container">
                <div className="nav__outside-links--icon-container">
                  <img src={checkpointLogoSvg} alt=""></img>
                </div>
                <a href={`${window.location.href}policy`} target="_blank" rel="noreferrer">
                  Policy
                </a>
              </div>
              <div className="nav__outside-links--container border-top">
                <div className="nav__outside-links--icon-container">
                  <img src={memberId ? logoutSvg : signInSvg} alt=""></img>
                </div>
                {memberId ? <p onClick={logoutHandler}>Sign Out</p> : <p onClick={loginHandler}>Sign In</p>}
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className={`background-control ${currentPage === 'background' || currentPage === 'ambient' ? 'show-control' : ''}`}>
        <img src={backgroundThumbnailUrl} alt="" onClick={openBackgroundPageHander} className="background-control__thumbnail"></img>
        <div className="background-control__ambient-container">
          <div className="background-control__ambient-volume">
            <p>Ambience</p>
            <img src={speakerSvg} alt=""></img>
            <input
              type="range"
              min="0"
              max="100"
              value={ambientVolume * 100}
              onChange={volumeAmbientChangeHandler}
              ref={ambientVolumeSliderRef}
              className="background-control__ambient-volume--slider"
            ></input>
          </div>
          {ambientThumbnailArr}
          <div onClick={openAmbientPageHander} className={'background-control__add-ambient'}>
            <img src={addSvg} alt=""></img>
          </div>
        </div>
      </div>
      <div className={`music-control ${currentPage === 'music' ? 'show-control' : ''}`}>
        {!memberId ? (
          <p className={`music-control__placeholder ${currentPage === 'music' ? 'show-control' : ''}`}>
            Join us to have your own music playlist
          </p>
        ) : (
          <>
            <div className="music-control__title">
              <img src={heartFullSvg} alt=""></img>
              <p>Favorite music</p>
            </div>
            {favouriteMusicIdArr.length === 0 ? (
              <p>Your music playlist is empty.</p>
            ) : (
              favouriteMusicIdArr.map((id) => (
                <div key={id} className="music-control__cards">
                  <FavouriteMusicCard id={id}></FavouriteMusicCard>
                </div>
              ))
            )}
          </>
        )}
      </div>
      {!isFullScreen && (
        <>
          <div className={`mood ${showLoginPopup || showSafariGuidePopup ? 'not-show' : ''}`}>
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
          <div className="player">
            <div className="player__music-data">
              <img
                src={favouriteMusicIdArr.includes(currentMusic.id) ? heartFullSvg : heartSvg}
                alt=""
                className="player__music-data--favourite-btn"
                onClick={favouriteBtnClickHandler}
              ></img>
              <img src={musicThumbnailUrl} className="player__music-data--thumbnail" alt=""></img>
              <div>
                <p className="player__music-data--music-name">{currentMusic.musicName}</p>
                <a href={currentMusic.artistLink} target="_blank" rel="noreferrer" className="player__music-data--artist-name">
                  {currentMusic.artistName}
                </a>
              </div>
            </div>
            <div className="player__music-control">
              <img
                src={shuffleSvg}
                onClick={toggleShuffleMusicHandler}
                alt=""
                className={`player__music-control--shuffle ${shuffleMusic ? 'current-song-setting' : ''}`}
              ></img>
              <img src={backwardSvg} onClick={backMusicHandler} alt="" className="player__music-control--back"></img>
              <img
                src={musicPlaying ? pauseSvg : playSvg}
                onClick={playPauseMusicHandler}
                alt=""
                className="player__music-control--play-pause"
              ></img>
              <img src={forwardSvg} onClick={nextMusicHandler} alt="" className="player__music-control--next"></img>
              <img
                src={loopSvg}
                onClick={toggleLoopMusicHandler}
                alt=""
                className={`player__music-control--loop ${loopMusic ? 'current-song-setting' : ''}`}
              ></img>
            </div>
            <div className="player__volume-control">
              <img src={musicLibrarySvg} onClick={musicClickHander} className="player__music-playlist" alt=""></img>
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
        </>
      )}
      {isFullScreen && (
        <img
          src={!isFullScreen ? fullScreenSvg : minimizeSvg}
          onClick={fullScreenClickHander}
          className="player__full-screen fullscreen"
          alt=""
        ></img>
      )}
    </div>
  );
}

export default Home;
