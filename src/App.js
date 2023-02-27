import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Loading from './pages/loading/Loading';
import Home from './pages/home/Home';
import Background from './pages/background/Background';
import Music from './pages/music/Music';
import Ambient from './pages/ambient/Ambient';
import Avatar from './pages/avatar/Avatar';
import Popup from './components/popup/Popup';

import Policy from './pages/policy/Policy';
import Mobile from './pages/mobile/Mobile';
import PresetToQuery from './helper/PresetToQuery';

import { backgroundActions } from './store/backgroundSlice';
import { ambientActions } from './store/ambientSlice';
import { musicActions } from './store/musicSlice';
import { avatarActions } from './store/avatarSlice';
import { memberActions } from './store/memberSlice';
import { pageActions } from './store/pageSlice';
import { popupActions } from './store/popupSlice';
import { deviceActions } from './store/deviceSlice';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const currentBackground = useSelector((store) => store.background.currentBackground);
  const currentMusic = useSelector((store) => store.music.currentMusic);
  const musicCategory = useSelector((store) => store.music.musicCategory);
  const favouriteMusicIdArr = useSelector((store) => store.music.favouriteMusicIdArr);
  const playFromPlaylist = useSelector((store) => store.music.playFromPlaylist);
  const memberId = useSelector((store) => store.member.memberId);
  const username = useSelector((store) => store.member.username);
  const currentAvatar = useSelector((store) => store.avatar.currentAvatar);
  const deviceId = useSelector((store) => store.device.deviceId);
  const startTime = useSelector((store) => store.device.startTime);

  const [doneInitialize, setDoneInitialize] = useState(false);

  const homeRef = useRef();

  const spacebarHandler = useCallback(
    (event) => {
      if (event.code === 'Space') {
        dispatch(musicActions.toggleMusicPlayPause());
      }
    },
    [dispatch]
  );

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('CheckpointEmail');
    localStorage.removeItem('CheckpointPassword');
    localStorage.removeItem('CheckpointLoginMethod');

    dispatch(deviceActions.clearDevice());
    dispatch(pageActions.closePageHandler());
    dispatch(musicActions.setMusicPlaying(false));
    dispatch(musicActions.setFavouriteMusicIdArr([]));
    dispatch(avatarActions.changeAvatarHandler(1));
    dispatch(popupActions.setShowProfilePopupPopup(false));
    dispatch(backgroundActions.changeBackgroundHandler('Anime_BG0221'));
    dispatch(memberActions.logout());
  }, [dispatch]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    if (!localStorage.getItem('checkpointShowTutorial')) {
      dispatch(popupActions.setShowTutorialPopup(true));
    }

    if (!localStorage.getItem('checkpointShowCookie')) {
      dispatch(popupActions.setShowCookiePopup(true));
    }

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && !document.webkitIsFullScreen) {
        dispatch(pageActions.setIsFullScreen(false));
      } else {
        dispatch(pageActions.setIsFullScreen(true));
      }
    });

    document.addEventListener('webkitfullscreenchange', () => {
      if (!document.fullscreenElement && !document.webkitIsFullScreen) {
        dispatch(pageActions.setIsFullScreen(false));
      } else {
        dispatch(pageActions.setIsFullScreen(true));
      }
    });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/resource`)
      .then((res) => res.json())
      .then((body) => {
        const { statusCode, data } = body;

        if (statusCode !== 2001) {
          if (statusCode === 4000) {
            throw new Error();
          }

          return;
        }

        const { ambient, background, backgroundCategory, music, musicCategory, avatar } = data;

        dispatch(
          ambientActions.setAvailableAmbient(
            ambient.map((ambient) => {
              return {
                ...ambient,
                url: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${ambient.filePath.replaceAll(' ', '+')}`,
                whiteIconUrl: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${ambient.whiteIconFilePath.replaceAll(' ', '+')}`,
                blackIconUrl: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${ambient.blackIconFilePath.replaceAll(' ', '+')}`,
              };
            })
          )
        );

        dispatch(
          backgroundActions.setAvailableBackground(
            background.map((background) => {
              return {
                ...background,
                url: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${background.filePath.replaceAll(' ', '+')}`,
                thumbnailUrl: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${background.thumbnailFilePath.replaceAll(' ', '+')}`,
              };
            })
          )
        );

        dispatch(backgroundActions.setAvailableBackgroundCategory(backgroundCategory));

        dispatch(
          musicActions.setAvailableMusicArr(
            music.map((music) => {
              return {
                ...music,
                url: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${music.filePath.replaceAll(' ', '+')}`,
                thumbnailUrl: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${music.thumbnailFilePath.replaceAll(' ', '+')}`,
              };
            })
          )
        );

        dispatch(musicActions.setAvailableMusicCategory(musicCategory));

        dispatch(
          avatarActions.setAvailableAvatar(
            avatar.map((avatar) => {
              return {
                ...avatar,
                url: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${avatar.filePath.replaceAll(' ', '+')}`,
              };
            })
          )
        );

        setDoneInitialize(true);
      })
      .catch(() => {});

    document.addEventListener('keyup', spacebarHandler);
  }, [spacebarHandler, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (memberId) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/feedback/status?member_id=${memberId}&table_name=feedback_five_minute`)
          .then((res) => res.json())
          .then((body) => {
            const { statusCode, data } = body;

            if (statusCode !== 2001) {
              if (statusCode === 4000) {
                throw new Error();
              }

              return;
            }

            const { feedbackStatus } = data;

            if (feedbackStatus === 'not done') {
              dispatch(popupActions.setShowFiveMinuteFeedbackPopup(true));
            }
          })
          .catch(() => {});
      }
    }, 300000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, memberId, spacebarHandler]);

  useEffect(() => {
    if (deviceId && currentBackground && currentMusic) {
      const requestData = {
        backgroundId: currentBackground.id,
        musicId: currentMusic.id,
        musicCategory,
        memberId,
        favouriteMusicIdArr,
        isPlayFromPlaylist: playFromPlaylist,
        deviceId,
        onlineDuration: Date.now() - startTime,
      };
      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/setting`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((body) => {
          const { statusCode } = body;

          if (statusCode !== 2000) {
            if (statusCode === 3003) {
              logoutHandler();
            }

            if (statusCode === 4000) {
              throw new Error();
            }

            return;
          }
        })
        .catch(() => {});
    }
  }, [
    memberId,
    currentBackground,
    currentMusic,
    musicCategory,
    favouriteMusicIdArr,
    playFromPlaylist,
    deviceId,
    startTime,
    dispatch,
    logoutHandler,
  ]);

  useEffect(() => {
    if (deviceId && currentAvatar) {
      const data = {
        memberId,
        avatarId: currentAvatar.id,
        username,
      };
      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((body) => {
          const { statusCode } = body;

          if (statusCode !== 2000) {
            if (statusCode === 4000) {
              throw new Error();
            }
          }
        })
        .catch(() => {});
    }
  }, [username, memberId, deviceId, currentAvatar]);

  function fullScreenClickHander() {
    if (document.fullscreenElement || document.webkitIsFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      dispatch(pageActions.setIsFullScreen(false));
    } else {
      if (homeRef.current.requestFullscreen) {
        homeRef.current.requestFullscreen();
      } else if (homeRef.current.webkitRequestFullScreen) {
        homeRef.current.webkitRequestFullScreen();
      }
      dispatch(pageActions.setIsFullScreen(true));
    }
  }

  if (isMobile && pathname === '/') {
    return <Mobile></Mobile>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Loading></Loading>
            {doneInitialize && (
              <div ref={homeRef}>
                <Popup spacebarHandler={spacebarHandler} logoutHandler={logoutHandler}></Popup>
                <Home fullScreenClickHander={fullScreenClickHander}></Home>
                <Background></Background>
                <Music></Music>
                <Ambient></Ambient>
                <Avatar></Avatar>
              </div>
            )}
          </>
        }
      ></Route>
      <Route path="policy/*" element={<Policy></Policy>}></Route>
      <Route path="helper/preset-to-query" element={<PresetToQuery></PresetToQuery>}></Route>
      <Route path="/*" element={<Navigate replace to="/"></Navigate>}></Route>
    </Routes>
  );
}

export default App;
