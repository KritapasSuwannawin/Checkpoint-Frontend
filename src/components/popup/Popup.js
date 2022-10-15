import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

import FiveMinuteFeedback from '../feedbackPopup/FiveMinuteFeedback';
import SafariGuide from '../safariGuide/SafariGuide';
import Tutorial from '../tutorial/Tutorial';
import LoginPopup from '../loginPopup/LoginPopup';
import HelpSupportPopup from '../helpSupportPopup/HelpSupportPopup';
import FeedbackPopup from '../feedbackPopup/FeedbackPopup';
import CookiePopup from '../cookiePopup/CookiePopup';

import { pageActions } from '../../store/pageSlice';
import { popupActions } from '../../store/popupSlice';

function Popup(props) {
  const spacebarHandler = props.spacebarHandler;

  const dispatch = useDispatch();

  const showLoginPopup = useSelector((store) => store.popup.showLoginPopup);
  const showHelpSupportPopup = useSelector((store) => store.popup.showHelpSupportPopup);
  const showCookiePopup = useSelector((store) => store.popup.showCookiePopup);
  const showFiveMinuteFeedbackPopup = useSelector((store) => store.popup.showFiveMinuteFeedbackPopup);
  const showFeedbackPopup = useSelector((store) => store.popup.showFeedbackPopup);
  const showSafariGuidePopup = useSelector((store) => store.popup.showSafariGuidePopup);
  const showTutorialPopup = useSelector((store) => store.popup.showTutorialPopup);

  const closeNavPopupHandler = useCallback(() => {
    dispatch(pageActions.closePageHandler());
    dispatch(popupActions.setShowTimerPopup(false));
    dispatch(popupActions.setShowOutsideLinkPopup(false));
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
    if (showFeedbackPopup) {
      document.removeEventListener('keyup', spacebarHandler);
    }
  }, [dispatch, spacebarHandler, showFeedbackPopup]);

  function closeFiveMinuteFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowFiveMinuteFeedbackPopup(false));
  }

  function closeSafariGuideHandler() {
    dispatch(popupActions.setShowSafariGuidePopup(false));
  }

  function closeTutorialHandler() {
    dispatch(popupActions.setShowTutorialPopup(false));
  }

  function closeFeedbackPopupHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowFeedbackPopup(false));
  }

  function showUpgradePopupHandler() {
    dispatch(popupActions.setShowTutorialPopup(false));
    dispatch(popupActions.setShowUpgradePopup(true));
  }

  const closeLoginPopup = useCallback(() => {
    dispatch(popupActions.setShowLoginPopup(false));
  }, [dispatch]);

  function closeHelpSupportHandler() {
    dispatch(popupActions.setShowHelpSupportPopup(false));
  }

  function closeCookiePopupHandler() {
    localStorage.setItem('checkpointShowCookie', '1');
    dispatch(popupActions.setShowCookiePopup(false));
  }

  return (
    <>
      {showFiveMinuteFeedbackPopup && <FiveMinuteFeedback closeHandler={closeFiveMinuteFeedbackHandler}></FiveMinuteFeedback>}
      {showSafariGuidePopup && <SafariGuide closeHandler={closeSafariGuideHandler}></SafariGuide>}
      {showTutorialPopup && <Tutorial closeHandler={closeTutorialHandler} showUpgradePopupHandler={showUpgradePopupHandler}></Tutorial>}

      {showCookiePopup && <CookiePopup closeHandler={closeCookiePopupHandler}></CookiePopup>}
      {showLoginPopup && <LoginPopup closeHandler={closeLoginPopup}></LoginPopup>}
      {showHelpSupportPopup && <HelpSupportPopup closeHandler={closeHelpSupportHandler}></HelpSupportPopup>}
      {showFeedbackPopup && <FeedbackPopup closeHandler={closeFeedbackPopupHandler}></FeedbackPopup>}
    </>
  );
}

export default Popup;
