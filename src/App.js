import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import Loading from './pages/loading/Loading';
import Home from './pages/home/Home';
import Background from './pages/background/Background';
import Music from './pages/music/Music';
import Ambient from './pages/ambient/Ambient';
import Avatar from './pages/avatar/Avatar';

import Policy from './pages/policy/Policy';
import PrivacyPolicy from './pages/policy/PrivacyPolicy';
import TermCondition from './pages/policy/TermCondition';
import CookiePolicy from './pages/policy/CookiePolicy';
import Gdpr from './pages/policy/Gdpr';
import CancellationRefundPolicy from './pages/policy/CancellationRefundPolicy';

import About from './pages/about/About';

import FiveMinuteFeedback from './components/feedbackPopup/FiveMinuteFeedback';
import TrialLastDayFeedback from './components/feedbackPopup/TrialLastDayFeedback';
import AfterTrialPremiumFeedback from './components/feedbackPopup/AfterTrialPremiumFeedback';
import AfterTrialStandardFeedback from './components/feedbackPopup/AfterTrialStandardFeedback';
import SafariGuide from './components/safariGuide/SafariGuide';
import Tutorial from './components/tutorial/Tutorial';

import { backgroundActions } from './store/backgroundSlice';
import { ambientActions } from './store/ambientSlice';
import { musicActions } from './store/musicSlice';
import { avatarActions } from './store/avatarSlice';
import { languageActions } from './store/languageSlice';
import { memberActions } from './store/memberSlice';
import { pageActions } from './store/pageSlice';

function App() {
  const dispatch = useDispatch();

  const { currentBackground } = useSelector((store) => store.background);
  const { currentMusic, musicCategory, favouriteMusicIdArr, playFromPlaylist } = useSelector((store) => store.music);
  const { memberId, dayOfTrial, isPremium, isOntrial } = useSelector((store) => store.member);
  const { currentAvatar } = useSelector((store) => store.avatar);
  const { deviceId, startTime } = useSelector((store) => store.device);

  const [showFiveMinuteFeedback, setShowFiveMinuteFeedback] = useState(false);
  const [showAfterTrialStandardFeedback, setShowAfterTrialStandardFeedback] = useState(false);
  const [showTrialLastDayFeedback, setShowTrialLastDayFeedback] = useState(false);
  const [showAfterTrialPremiumFeedback, setShowAfterTrialPremiumFeedback] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showSafariGuide, setShowSafariGuide] = useState(false);
  const [doneInitialize, setDoneInitialize] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  function mobileOrTabletCheck() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  const isMobileDevice =
    /Mobi/i.test(window.navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform) ||
    typeof window.orientation !== 'undefined' ||
    mobileOrTabletCheck();

  const spacebarHandler = useCallback(
    (event) => {
      if (event.code === 'Space') {
        dispatch(musicActions.toggleMusicPlayPause());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (window.location.protocol === 'http:' && !window.location.href.includes('http://localhost:3000/')) {
      window.location.replace(window.location.href.replace('http:', 'https:'));
    }

    if (isMobileDevice && window.location.pathname === '/') {
      return;
    }

    if (window.navigator.userLanguage === 'ja' || window.navigator.language === 'ja') {
      dispatch(languageActions.languageChangeHandler());
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`)
      .then((response) => response.json())
      .then((result) => {
        const { ambient, background, music, avatar } = result.data;

        dispatch(
          ambientActions.setAvailableAmbient(
            ambient.map((ambient) => {
              return {
                ...ambient,
                url: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${ambient.filePath.replaceAll(' ', '+')}`,
                thumbnailUrl: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${ambient.thumbnailFilePath.replaceAll(' ', '+')}`,
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
        dispatch(
          musicActions.setAvailableMusic(
            music.map((music) => {
              return {
                ...music,
                url: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${music.filePath.replaceAll(' ', '+')}`,
                thumbnailUrl: `${process.env.REACT_APP_CLOUD_STORAGE_URL}/${music.thumbnailFilePath.replaceAll(' ', '+')}`,
              };
            })
          )
        );
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

        if (ambient.name !== 'error' && background.name !== 'error' && music.name !== 'error' && avatar.name !== 'error') {
          setDoneInitialize(true);
        } else {
          window.location.reload();
        }
      })
      .catch(() => {
        window.location.reload();
      });

    document.addEventListener('keyup', spacebarHandler);
  }, [isMobileDevice, spacebarHandler, dispatch]);

  useEffect(() => {
    if (
      memberId &&
      navigator.userAgent.includes('Safari') &&
      !navigator.userAgent.includes('Chrome') &&
      !localStorage.getItem('checkpointShowSafariPopup')
    ) {
      setShowSafariGuide(true);
      localStorage.setItem('checkpointShowSafariPopup', '1');
    }

    if (memberId && !localStorage.getItem('checkpointShowTutorial')) {
      setShowTutorial(true);
      localStorage.setItem('checkpointShowTutorial', '1');
    }
  }, [memberId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (memberId) {
        const data = { memberId, tableName: 'feedback_five_minute' };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/check-feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.message !== 'done') {
              document.removeEventListener('keyup', spacebarHandler);
              setShowFiveMinuteFeedback(true);
            }
          });
      }
    }, 300000);

    return () => {
      clearTimeout(timeout);
    };
  }, [memberId, spacebarHandler]);

  useEffect(() => {
    if (memberId && dayOfTrial === 7) {
      const data = { memberId, tableName: 'feedback_trial_last_day' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/check-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message !== 'done') {
            document.removeEventListener('keyup', spacebarHandler);
            setShowTrialLastDayFeedback(true);
          }
        });
    }
  }, [memberId, dayOfTrial, spacebarHandler]);

  useEffect(() => {
    if (memberId && !isPremium) {
      const data = { memberId, tableName: 'feedback_after_trial_standard' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/check-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message !== 'done') {
            document.removeEventListener('keyup', spacebarHandler);
            setShowAfterTrialStandardFeedback(true);
          }
        });
    }
  }, [memberId, isPremium, spacebarHandler]);

  useEffect(() => {
    if (memberId && isPremium && !isOntrial) {
      const data = { memberId, tableName: 'feedback_after_trial_premium' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/check-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message !== 'done') {
            document.removeEventListener('keyup', spacebarHandler);
            setShowAfterTrialPremiumFeedback(true);
          }
        });
    }
  }, [memberId, isPremium, isOntrial, spacebarHandler]);

  useEffect(() => {
    if (memberId && currentBackground && currentMusic) {
      const data = {
        backgroundId: currentBackground.id,
        musicId: currentMusic.id,
        musicCategory,
        memberId,
        favouriteMusicIdArr,
        playFromPlaylist,
        deviceId,
        onlineDuration: Date.now() - startTime,
      };
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/setting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          const errorMessage = result.message;
          if (errorMessage === 'new device has logged in') {
            localStorage.removeItem('CheckpointEmail');
            localStorage.removeItem('CheckpointPassword');
            localStorage.removeItem('CheckpointLoginMethod');

            dispatch(memberActions.logout());
            dispatch(pageActions.closePageHandler());
            dispatch(musicActions.setMusicPlaying(false));
            dispatch(avatarActions.changeAvatarHandler(1));
          }
        })
        .catch(() => {});
    }
  }, [memberId, currentBackground, currentMusic, musicCategory, favouriteMusicIdArr, playFromPlaylist, deviceId, startTime, dispatch]);

  useEffect(() => {
    if (memberId && currentAvatar) {
      const data = {
        memberId,
        avatarId: currentAvatar.id,
      };
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
  }, [memberId, currentAvatar]);

  function closeFiveMinuteFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    setShowFiveMinuteFeedback(false);
  }

  function closeTrialLastDayFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    setShowTrialLastDayFeedback(false);
  }

  function closeAfterTrialPremiumFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    setShowAfterTrialPremiumFeedback(false);
  }

  function closeAfterTrialStandardFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    setShowAfterTrialStandardFeedback(false);
  }

  function showFeedbackPopupHandler() {
    document.removeEventListener('keyup', spacebarHandler);
    setShowFeedbackPopup(true);
  }

  function closeFeedbackPopupHandler() {
    document.addEventListener('keyup', spacebarHandler);
    setShowFeedbackPopup(false);
  }

  function closeSafariGuideHandler() {
    setShowSafariGuide(false);
  }

  function showTutorialHandler() {
    setShowTutorial(true);
  }

  function closeTutorialHandler() {
    setShowTutorial(false);
  }

  function showUpgradePopupHandler() {
    setShowTutorial(false);
    setShowUpgradePopup(true);
  }

  function closeUpgradePopupHandler() {
    setShowUpgradePopup(false);
  }

  if (isMobileDevice && window.location.pathname === '/') {
    return <Redirect to="/about"></Redirect>;
  }

  return (
    <>
      <Route exact path="/">
        <Loading></Loading>
        {showFiveMinuteFeedback && <FiveMinuteFeedback closeHandler={closeFiveMinuteFeedbackHandler}></FiveMinuteFeedback>}
        {showTrialLastDayFeedback && <TrialLastDayFeedback closeHandler={closeTrialLastDayFeedbackHandler}></TrialLastDayFeedback>}
        {showAfterTrialStandardFeedback && (
          <AfterTrialStandardFeedback closeHandler={closeAfterTrialStandardFeedbackHandler}></AfterTrialStandardFeedback>
        )}
        {showAfterTrialPremiumFeedback && (
          <AfterTrialPremiumFeedback closeHandler={closeAfterTrialPremiumFeedbackHandler}></AfterTrialPremiumFeedback>
        )}
        {showSafariGuide && <SafariGuide closeHandler={closeSafariGuideHandler}></SafariGuide>}
        {showTutorial && <Tutorial closeHandler={closeTutorialHandler} showUpgradePopupHandler={showUpgradePopupHandler}></Tutorial>}
        {doneInitialize && (
          <>
            <Home
              showFeedbackPopup={showFeedbackPopup}
              showFeedbackPopupHandler={showFeedbackPopupHandler}
              closeFeedbackPopupHandler={closeFeedbackPopupHandler}
              showUpgradePopup={showUpgradePopup}
              closeUpgradePopupHandler={closeUpgradePopupHandler}
              showTutorialHandler={showTutorialHandler}
            ></Home>
            <Background></Background>
            <Music></Music>
            <Ambient showUpgradePopupHandler={showUpgradePopupHandler}></Ambient>
            <Avatar></Avatar>
          </>
        )}
      </Route>

      <Route exact path="/policy">
        <Policy></Policy>
      </Route>

      <Route exact path="/privacy-policy">
        <PrivacyPolicy></PrivacyPolicy>
      </Route>

      <Route exact path="/term-condition">
        <TermCondition></TermCondition>
      </Route>

      <Route exact path="/cookie-policy">
        <CookiePolicy></CookiePolicy>
      </Route>

      <Route exact path="/gdpr-singapore-japan-statement">
        <Gdpr></Gdpr>
      </Route>

      <Route exact path="/cancellation-refund-policy">
        <CancellationRefundPolicy></CancellationRefundPolicy>
      </Route>

      <Route exact path="/about">
        <About></About>
      </Route>
    </>
  );
}

export default App;
