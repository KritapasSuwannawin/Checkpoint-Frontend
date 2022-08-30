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
import { languageActions } from '../../store/languageSlice';
import { memberActions } from '../../store/memberSlice';
import { avatarActions } from '../../store/avatarSlice';
import { popupActions } from '../../store/popupSlice';
import { deviceActions } from '../../store/deviceSlice';

import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import buyPremiumBtnJP from '../../svg/50px/Buy Premium Button JP.svg';
import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';
import playSvg50 from '../../svg/50px/Circled Play.svg';
import pauseSvg50 from '../../svg/50px/Pause Button.svg';
import profileSvg50 from '../../svg/50px/Profile.svg';
import daySvg36 from '../../svg/36px/Sun.svg';
import eveningSvg36 from '../../svg/36px/Sunset.svg';
import nightSvg36 from '../../svg/36px/Moon Symbol.svg';
import cloudySvg36 from '../../svg/36px/Partly Cloudy Day.svg';
import rainySvg36 from '../../svg/36px/Moderate Rain.svg';
import thunderSvg36 from '../../svg/36px/Storm.svg';
import snowySvg36 from '../../svg/36px/Winter.svg';
import musicLibrarySvg36 from '../../svg/36px/Music Library.svg';
import backgroundSvg30 from '../../svg/30px/Bg30px.svg';
import musicSvg30 from '../../svg/30px/Music30px.svg';
import timerSvg30 from '../../svg/30px/Timer.svg';
import globe30 from '../../svg/30px/Globe30px.png';
import heartFullSvg30 from '../../svg/30px/Heart.svg';
import heartSvg30 from '../../svg/30px/Hearts.svg';
import ambientSvg30 from '../../svg/30px/Organic Food.svg';
import iTunesSvg30 from '../../svg/30px/iTunes-1.svg';
import fullScreenSvg30 from '../../svg/30px/Fullscreen.svg';
import minimizeSvg30 from '../../svg/30px/Minimize.svg';
import shuffleSvg25 from '../../svg/25px/Shuffle.svg';
import loopSvg25 from '../../svg/25px/Repeat.svg';
import backwardSvg25 from '../../svg/25px/Rewind-1.svg';
import forwardSvg25 from '../../svg/25px/Fast Forward-1.svg';
import addSvg20 from '../../svg/20px/Add20px.svg';
import signInSvg20 from '../../svg/20px/SignIn.svg';
import creditCardSvg20 from '../../svg/20px/Credit Card.svg';
import questionMarkSvg20 from '../../svg/20px/Question Mark.svg';
import paperPlaneSvg20 from '../../svg/20px/Paper Plane.svg';
import informationIconSvg20 from '../../svg/20px/Information Icon.svg';
import checkpointLogoSvg20 from '../../svg/20px/Checkpoint Logo.svg';
import policySvg20 from '../../svg/20px/Policy.svg';
import logoutSvg20 from '../../svg/20px/Logout.svg';
import speakerSvg15 from '../../svg/15px/Speaker-1.svg';

const dictionary = {
  language: ['EN', 'JP'],
  music: ['Music', 'ミュージック'],
  background: ['Background', 'バックグラウンド'],
  aboutUs: ['About Us', 'Checkpointについて'],
  policy: ['Policy', 'プライバシーポリシー'],
  donate: ['Donate', '寄付する'],
};

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
  const isJapanese = useSelector((store) => store.language.isJapanese);
  const memberId = useSelector((store) => store.member.memberId);
  const username = useSelector((store) => store.member.username);
  const isPremium = useSelector((store) => store.member.isPremium);
  const isOntrial = useSelector((store) => store.member.isOntrial);
  const dayOfTrial = useSelector((store) => store.member.dayOfTrial);
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
    if (!isPremium && (memberId && ['03', '04'].includes(currentBackground.id.slice(0, 2)) ? false : currentBackground.isPremium)) {
      dispatch(backgroundActions.changeBackgroundHandler('0211'));
    }

    setBackgroundThumbnailUrl(currentBackground.thumbnailUrl);
  }, [currentBackground, dispatch, isPremium, memberId]);

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

  useEffect(() => {
    if (memberId) {
      if (dayOfTrial === 7 && !localStorage.getItem('checkpointShowLastDayTrialPopup')) {
        dispatch(popupActions.setShowLastDayTrialPopup(true));
      } else if (!isPremium && !localStorage.getItem('checkpointShowExpirationPopup')) {
        dispatch(popupActions.setShowExpirationPopup(true));
      }
    }
  }, [dispatch, memberId, dayOfTrial, isPremium]);

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

  function languageChangeHandler() {
    dispatch(languageActions.languageChangeHandler());
  }

  function buyPremiumClickHandler() {
    if (!checkMemberId()) {
      return;
    }

    dispatch(popupActions.setShowUpgradePopup(true));
    dispatch(popupActions.setShowSubscriptionPopup(false));
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
    dispatch(memberActions.logout());
  }

  function loginHandler() {
    dispatch(popupActions.setShowLoginPopup(true));
  }

  function activationBtnClickHandler() {
    if (!checkMemberId()) {
      return;
    }

    dispatch(popupActions.setShowSubscriptionPopup(false));
    dispatch(popupActions.setShowActivationPopup(true));
  }

  function openHelpSupportHandler() {
    dispatch(popupActions.setShowHelpSupportPopup(true));
    dispatch(popupActions.setShowActivationPopup(false));
  }

  function openFeedbackHandler() {
    dispatch(popupActions.setShowFeedbackPopup(true));
  }

  function openSubscriptionHandler() {
    dispatch(popupActions.setShowSubscriptionPopup(true));
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
              <img src={isPremium ? logoPremium50 : logo50} alt="" className="nav__logo--img"></img>
              {(!isPremium || isOntrial) && (
                <>
                  <img
                    className="nav__logo--upgrade-btn"
                    onClick={buyPremiumClickHandler}
                    src={!isJapanese ? buyPremiumBtn : buyPremiumBtnJP}
                    alt=""
                  ></img>
                  <div className="nav__logo--text-btn" onClick={activationBtnClickHandler}>
                    {!isJapanese ? 'Activate Premium' : 'プレミアム有効化'}
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <div className="nav__links">
          {!isFullScreen && (
            <div onClick={showTutorialHandler} className={`nav__links--link margin-right ${isJapanese ? 'japanese' : ''}`}>
              {!isJapanese ? 'Tutorial' : 'チュートリアル'}
            </div>
          )}
          <div className="nav__links--timer-container">
            {!isFullScreen && (
              <div onClick={timerClickHandler} className={`nav__links--link margin-right ${isJapanese ? 'japanese' : ''}`}>
                <img src={timerSvg30} alt="" className="nav__links--icon small"></img>
                {!isJapanese ? 'Timer' : 'タイマー'}
              </div>
            )}
            <Timer closeHandler={closeTimerHandler} showTimer={showTimerPopup}></Timer>
          </div>
          {!isFullScreen && (
            <>
              <div
                onClick={musicClickHander}
                className={`nav__links--link ${currentPage === 'music' ? 'current-page' : ''} ${isJapanese ? 'japanese' : ''}`}
              >
                <img src={musicSvg30} alt="" className="nav__links--icon"></img>
                {dictionary.music[!isJapanese ? 0 : 1]}
              </div>
              <div
                onClick={backgroundClickHander}
                className={`nav__links--link fixed-width ${isJapanese ? 'japanese' : ''} ${
                  currentPage === 'background' || currentPage === 'ambient' ? 'current-page' : ''
                }`}
              >
                <img src={backgroundSvg30} alt="" className="nav__links--icon"></img>
                {dictionary.background[!isJapanese ? 0 : 1]}
              </div>
              <div className="nav__links--link language" onClick={languageChangeHandler}>
                <img className="nav__links--icon" src={globe30} alt=""></img>
                {dictionary.language[!isJapanese ? 0 : 1]}
              </div>
              <img
                className={`nav__links--link profile ${isPremium ? 'premium' : ''} ${isJapanese ? 'japanese' : ''}`}
                src={memberId ? currentAvatar.url : profileSvg50}
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
                    <img src={currentAvatar.url} className={`${isPremium ? 'premium' : ''}`} alt="" onClick={openAvatarPageHander}></img>
                    <div>
                      <p className="nav__outside-links--username">{username}</p>
                      <p className="nav__outside-links--member-id">{`#${memberId}`}</p>
                    </div>
                  </div>
                  <div className="nav__outside-links--btn-container">
                    <img
                      className="nav__logo--upgrade-btn"
                      onClick={buyPremiumClickHandler}
                      src={!isJapanese ? buyPremiumBtn : buyPremiumBtnJP}
                      alt=""
                    ></img>
                    <div className="nav__logo--text-btn" onClick={activationBtnClickHandler}>
                      {isPremium && !isOntrial
                        ? !isJapanese
                          ? 'Extend Premium'
                          : 'プレミアム延長'
                        : !isJapanese
                        ? 'Activate Premium'
                        : 'プレミアム有効化'}
                    </div>
                  </div>
                  <div className="nav__outside-links--container">
                    <div className="nav__outside-links--icon-container">
                      <img src={creditCardSvg20} alt="" className="small"></img>
                    </div>
                    <p onClick={openSubscriptionHandler}>{!isJapanese ? 'Subscription' : 'サブスクリプション'}</p>
                  </div>
                  <div className="nav__outside-links--container">
                    <div className="nav__outside-links--icon-container">
                      <img src={questionMarkSvg20} alt=""></img>
                    </div>
                    <p onClick={openHelpSupportHandler}>{!isJapanese ? 'Help & Support' : 'ヘルプ＆サポート'}</p>
                  </div>
                  <div className="nav__outside-links--container">
                    <div className="nav__outside-links--icon-container">
                      <img src={paperPlaneSvg20} alt=""></img>
                    </div>
                    <p onClick={openFeedbackHandler}>{!isJapanese ? 'Feedback' : 'ご意見・ご感想'}</p>
                  </div>
                </>
              )}
              <div className={`nav__outside-links--container ${memberId ? 'border-top' : ''}`}>
                <div className="nav__outside-links--icon-container">
                  <img src={informationIconSvg20} alt=""></img>
                </div>
                <a href={`${window.location.href}about`} target="_blank" rel="noreferrer">
                  {dictionary.aboutUs[!isJapanese ? 0 : 1]}
                </a>
              </div>
              <div className="nav__outside-links--container">
                <div className="nav__outside-links--icon-container">
                  <img src={policySvg20} alt=""></img>
                </div>
                <a href={'https://forms.gle/rCnXynzSeH8WhMRC9'} target="_blank" rel="noreferrer">
                  {!isJapanese ? 'For Artist' : 'アーティスト向け'}
                </a>
              </div>
              <div className="nav__outside-links--container">
                <div className="nav__outside-links--icon-container">
                  <img src={checkpointLogoSvg20} alt=""></img>
                </div>
                <a href={`${window.location.href}policy`} target="_blank" rel="noreferrer">
                  {dictionary.policy[!isJapanese ? 0 : 1]}
                </a>
              </div>
              <div className="nav__outside-links--container border-top">
                <div className="nav__outside-links--icon-container">
                  <img src={memberId ? logoutSvg20 : signInSvg20} alt=""></img>
                </div>
                {memberId ? (
                  <p onClick={logoutHandler}>{!isJapanese ? 'Sign Out' : 'ログアウト'}</p>
                ) : (
                  <p onClick={loginHandler}>{!isJapanese ? 'Sign In' : 'ログイン'}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className={`background-control ${currentPage === 'background' || currentPage === 'ambient' ? 'show-control' : ''}`}>
        <img src={backgroundThumbnailUrl} alt="" onClick={openBackgroundPageHander} className="background-control__thumbnail"></img>
        <div className="background-control__ambient-container">
          <div className="background-control__ambient-volume">
            <p>{!isJapanese ? 'Ambience' : 'アンビエンス'}</p>
            <img src={speakerSvg15} alt=""></img>
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
            <img src={addSvg20} alt=""></img>
          </div>
        </div>
      </div>
      <div className={`music-control ${currentPage === 'music' ? 'show-control' : ''}`}>
        {!memberId ? (
          <p className={`music-control__placeholder ${currentPage === 'music' ? 'show-control' : ''}`}>
            {!isJapanese ? 'Join us to have your own music playlist' : '参加して、自分だけの音楽プレイリストを作りましょう'}
          </p>
        ) : (
          <>
            <div className="music-control__title">
              <img src={heartFullSvg30} alt=""></img>
              <p>{!isJapanese ? 'Favorite music' : 'お気に入り'}</p>
            </div>
            {favouriteMusicIdArr.length === 0 ? (
              <p>{!isJapanese ? 'Your music playlist is empty.' : 'お気に入りの曲はまだありません。'}</p>
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
                src={daySvg36}
                alt=""
                onClick={changeBackgroundTimeHandler.bind(1)}
                className={currentBackground.id.slice(2, 3) !== '1' ? 'mood__section--not-current-mood' : ''}
              ></img>
              <img
                src={eveningSvg36}
                alt=""
                onClick={changeBackgroundTimeHandler.bind(2)}
                className={currentBackground.id.slice(2, 3) !== '2' ? 'mood__section--not-current-mood' : ''}
              ></img>
              <img
                src={nightSvg36}
                alt=""
                onClick={changeBackgroundTimeHandler.bind(3)}
                className={`${currentBackground.id.slice(2, 3) !== '3' ? 'mood__section--not-current-mood' : ''}`}
              ></img>
            </div>
            <div className="mood__section">
              <img
                src={cloudySvg36}
                alt=""
                onClick={changeBackgroundWeatherHandler.bind(1)}
                className={currentBackground.id.slice(3) !== '1' ? 'mood__section--not-current-mood' : ''}
              ></img>
              <img
                src={rainySvg36}
                alt=""
                onClick={changeBackgroundWeatherHandler.bind(2)}
                className={currentBackground.id.slice(3) !== '2' ? 'mood__section--not-current-mood' : ''}
              ></img>
              <img
                src={thunderSvg36}
                alt=""
                onClick={changeBackgroundWeatherHandler.bind(3)}
                className={`${currentBackground.id.slice(3) !== '3' ? 'mood__section--not-current-mood' : ''}`}
              ></img>
              <img
                src={snowySvg36}
                alt=""
                onClick={changeBackgroundWeatherHandler.bind(4)}
                className={`${currentBackground.id.slice(3) !== '4' ? 'mood__section--not-current-mood' : ''}`}
              ></img>
            </div>
          </div>
          <div className="player">
            <div className="player__music-data">
              <img
                src={favouriteMusicIdArr.includes(currentMusic.id) ? heartFullSvg30 : heartSvg30}
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
              <img src={musicLibrarySvg36} onClick={musicClickHander} className="player__music-playlist" alt=""></img>
              <div className="player__volume-control--volume">
                <div className="player__volume-control--section">
                  <img src={iTunesSvg30} onClick={toggleMuteMusicHandler} className="player__volume-control--mute" alt=""></img>
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
                  <img src={ambientSvg30} onClick={toggleMuteAmbientHandler} className="player__volume-control--mute" alt=""></img>
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
                src={!isFullScreen ? fullScreenSvg30 : minimizeSvg30}
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
          src={!isFullScreen ? fullScreenSvg30 : minimizeSvg30}
          onClick={fullScreenClickHander}
          className="player__full-screen fullscreen"
          alt=""
        ></img>
      )}
    </div>
  );
}

export default Home;
