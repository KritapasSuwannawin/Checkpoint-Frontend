import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { isSafari } from 'react-device-detect';

import FiveMinuteFeedback from '../feedbackPopup/FiveMinuteFeedback';
import SafariGuide from '../safariGuide/SafariGuide';
import Tutorial from '../tutorial/Tutorial';
import LoginPopup from '../loginPopup/LoginPopup';
import HelpSupportPopup from '../helpSupportPopup/HelpSupportPopup';
import FeedbackPopup from '../feedbackPopup/FeedbackPopup';
import CookiePopup from '../cookiePopup/CookiePopup';
import ProfilePopup from '../profilePopup/ProfilePopup';

import { pageActions } from '../../store/pageSlice';
import { popupActions } from '../../store/popupSlice';

function Popup(props) {
  const { spacebarHandler, logoutHandler } = props;

  const dispatch = useDispatch();

  const showLoginPopup = useSelector((store) => store.popup.showLoginPopup);
  const showHelpSupportPopup = useSelector((store) => store.popup.showHelpSupportPopup);
  const showCookiePopup = useSelector((store) => store.popup.showCookiePopup);
  const showFiveMinuteFeedbackPopup = useSelector((store) => store.popup.showFiveMinuteFeedbackPopup);
  const showFeedbackPopup = useSelector((store) => store.popup.showFeedbackPopup);
  const showSafariGuidePopup = useSelector((store) => store.popup.showSafariGuidePopup);
  const showTutorialPopup = useSelector((store) => store.popup.showTutorialPopup);
  const showProfilePopupPopup = useSelector((store) => store.popup.showProfilePopupPopup);

  const closeNavPopupHandler = useCallback(() => {
    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setShowProfilePopupPopup(false));
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      closeNavPopupHandler();
    });
  }, [closeNavPopupHandler]);

  useEffect(() => {
    if (showLoginPopup || showHelpSupportPopup || showFeedbackPopup) {
      closeNavPopupHandler();
    }
  }, [dispatch, closeNavPopupHandler, showLoginPopup, showHelpSupportPopup, showFeedbackPopup]);

  useEffect(() => {
    if (showFeedbackPopup || showHelpSupportPopup) {
      document.removeEventListener('keyup', spacebarHandler);
    }
  }, [dispatch, spacebarHandler, showFeedbackPopup, showHelpSupportPopup]);

  function closeFiveMinuteFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowFiveMinuteFeedbackPopup(false));
  }

  function closeSafariGuideHandler() {
    localStorage.setItem('checkpointShowSafariGuidePopup', '1');
    dispatch(popupActions.setShowSafariGuidePopup(false));
  }

  function closeTutorialHandler() {
    localStorage.setItem('checkpointShowTutorial', '1');
    dispatch(popupActions.setShowTutorialPopup(false));

    if (isSafari && !localStorage.getItem('checkpointShowSafariGuidePopup')) {
      dispatch(popupActions.setShowSafariGuidePopup(true));
    }
  }

  function closeFeedbackPopupHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowFeedbackPopup(false));
  }

  const closeLoginPopup = useCallback(() => {
    dispatch(popupActions.setShowLoginPopup(false));
  }, [dispatch]);

  function closeHelpSupportHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowHelpSupportPopup(false));
  }

  function closeCookiePopupHandler() {
    localStorage.setItem('checkpointShowCookie', '1');
    dispatch(popupActions.setShowCookiePopup(false));
  }

  return (
    <>
      {showFiveMinuteFeedbackPopup && <FiveMinuteFeedback closeHandler={closeFiveMinuteFeedbackHandler}></FiveMinuteFeedback>}
      {showFeedbackPopup && <FeedbackPopup closeHandler={closeFeedbackPopupHandler}></FeedbackPopup>}
      {showSafariGuidePopup && <SafariGuide closeHandler={closeSafariGuideHandler}></SafariGuide>}
      {showTutorialPopup && <Tutorial closeHandler={closeTutorialHandler}></Tutorial>}
      {showCookiePopup && <CookiePopup closeHandler={closeCookiePopupHandler}></CookiePopup>}
      {showLoginPopup && <LoginPopup closeHandler={closeLoginPopup}></LoginPopup>}
      {showHelpSupportPopup && <HelpSupportPopup closeHandler={closeHelpSupportHandler}></HelpSupportPopup>}
      {showProfilePopupPopup && <ProfilePopup logoutHandler={logoutHandler}></ProfilePopup>}
    </>
  );
}

export default Popup;
