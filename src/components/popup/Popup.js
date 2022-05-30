import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

import FiveMinuteFeedback from '../feedbackPopup/FiveMinuteFeedback';
import TrialLastDayFeedback from '../feedbackPopup/TrialLastDayFeedback';
import AfterTrialPremiumFeedback from '../feedbackPopup/AfterTrialPremiumFeedback';
import AfterTrialStandardFeedback from '../feedbackPopup/AfterTrialStandardFeedback';
import SafariGuide from '../safariGuide/SafariGuide';
import Tutorial from '../tutorial/Tutorial';
import LoginPopup from '../loginPopup/LoginPopup';
import UpgradePopup from '../upgradePopup/UpgradePopup';
import FreeTrialPopup from '../freeTrialPopup/FreeTrialPopup';
import LastDayTrialPopup from '../freeTrialPopup/LastDayTrialPopup';
import ExpirationPopup from '../freeTrialPopup/ExpirationPopup';
import ActivationPopup from '../activationPopup/ActivationPopup';
import HelpSupportPopup from '../helpSupportPopup/HelpSupportPopup';
import FeedbackPopup from '../feedbackPopup/FeedbackPopup';
import SubscriptionPopup from '../subscriptionPopup/SubscriptionPopup';
import CookiePopup from '../cookiePopup/CookiePopup';

import { pageActions } from '../../store/pageSlice';
import { popupActions } from '../../store/popupSlice';

function Popup(props) {
  const spacebarHandler = props.spacebarHandler;

  const dispatch = useDispatch();

  const showLoginPopup = useSelector((store) => store.popup.showLoginPopup);
  const showUpgradePopup = useSelector((store) => store.popup.showUpgradePopup);
  const showFreeTrialPopup = useSelector((store) => store.popup.showFreeTrialPopup);
  const showLastDayTrialPopup = useSelector((store) => store.popup.showLastDayTrialPopup);
  const showExpirationPopup = useSelector((store) => store.popup.showExpirationPopup);
  const showActivationPopup = useSelector((store) => store.popup.showActivationPopup);
  const showHelpSupportPopup = useSelector((store) => store.popup.showHelpSupportPopup);
  const showSubscriptionPopup = useSelector((store) => store.popup.showSubscriptionPopup);
  const showCookiePopup = useSelector((store) => store.popup.showCookiePopup);
  const showFiveMinuteFeedbackPopup = useSelector((store) => store.popup.showFiveMinuteFeedbackPopup);
  const showAfterTrialStandardFeedbackPopup = useSelector((store) => store.popup.showAfterTrialStandardFeedbackPopup);
  const showTrialLastDayFeedbackPopup = useSelector((store) => store.popup.showTrialLastDayFeedbackPopup);
  const showAfterTrialPremiumFeedbackPopup = useSelector((store) => store.popup.showAfterTrialPremiumFeedbackPopup);
  const showFeedbackPopup = useSelector((store) => store.popup.showFeedbackPopup);
  const showSafariGuidePopup = useSelector((store) => store.popup.showSafariGuidePopup);
  const showTutorialPopup = useSelector((store) => store.popup.showTutorialPopup);

  const isPremium = useSelector((store) => store.member.isPremium);

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
    if (showUpgradePopup || showLoginPopup || showActivationPopup || showHelpSupportPopup || showFeedbackPopup || showSubscriptionPopup) {
      closeNavPopupHandler();
    }
  }, [
    dispatch,
    closeNavPopupHandler,
    showUpgradePopup,
    showLoginPopup,
    showActivationPopup,
    showHelpSupportPopup,
    showFeedbackPopup,
    showSubscriptionPopup,
  ]);

  useEffect(() => {
    if (showFeedbackPopup) {
      document.removeEventListener('keyup', spacebarHandler);
    }
  }, [dispatch, spacebarHandler, showFeedbackPopup]);

  function closeFiveMinuteFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowFiveMinuteFeedbackPopup(false));
  }

  function closeTrialLastDayFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowTrialLastDayFeedbackPopup(false));
  }

  function closeAfterTrialPremiumFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowAfterTrialPremiumFeedbackPopup(false));
  }

  function closeAfterTrialStandardFeedbackHandler() {
    document.addEventListener('keyup', spacebarHandler);
    dispatch(popupActions.setShowAfterTrialStandardFeedbackPopup(false));
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

  function closeUpgradePopupHandler() {
    dispatch(popupActions.setShowUpgradePopup(false));
  }

  const closeLoginPopup = useCallback(
    (showFreeTrialPopup) => {
      dispatch(popupActions.setShowLoginPopup(false));

      if (showFreeTrialPopup) {
        dispatch(popupActions.setShowFreeTrialPopup(true));
      }
    },
    [dispatch]
  );

  function closeFreeTrialPopup() {
    dispatch(popupActions.setShowFreeTrialPopup(false));
  }

  function closeLastDayTrialPopup() {
    localStorage.setItem('checkpointShowLastDayTrialPopup', 1);
    dispatch(popupActions.setShowLastDayTrialPopup(false));
  }

  function closeExpirationPopup() {
    localStorage.setItem('checkpointShowExpirationPopup', 1);
    dispatch(popupActions.setShowExpirationPopup(false));
  }

  function closeActivationPopup() {
    dispatch(popupActions.setShowActivationPopup(false));
  }

  function closeHelpSupportHandler() {
    dispatch(popupActions.setShowHelpSupportPopup(false));
  }

  function closeSubscriptionHandler() {
    dispatch(popupActions.setShowSubscriptionPopup(false));
  }

  function openHelpSupportHandler() {
    closeNavPopupHandler();
    dispatch(popupActions.setShowActivationPopup(false));
    dispatch(popupActions.setShowHelpSupportPopup(true));
  }

  function activationBtnClickHandler() {
    closeNavPopupHandler();
    dispatch(popupActions.setShowSubscriptionPopup(false));
    dispatch(popupActions.setShowActivationPopup(true));
  }

  function navBtnClickHandler() {
    closeNavPopupHandler();

    if (isPremium === undefined) {
      dispatch(popupActions.setShowLoginPopup(true));
    } else {
      dispatch(popupActions.setShowUpgradePopup(true));
      dispatch(popupActions.setShowSubscriptionPopup(false));
    }
  }

  function closeCookiePopupHandler() {
    localStorage.setItem('checkpointShowCookie', '1');
    dispatch(popupActions.setShowCookiePopup(false));
  }

  return (
    <>
      {showFiveMinuteFeedbackPopup && <FiveMinuteFeedback closeHandler={closeFiveMinuteFeedbackHandler}></FiveMinuteFeedback>}
      {showTrialLastDayFeedbackPopup && <TrialLastDayFeedback closeHandler={closeTrialLastDayFeedbackHandler}></TrialLastDayFeedback>}
      {showAfterTrialStandardFeedbackPopup && (
        <AfterTrialStandardFeedback closeHandler={closeAfterTrialStandardFeedbackHandler}></AfterTrialStandardFeedback>
      )}
      {showAfterTrialPremiumFeedbackPopup && (
        <AfterTrialPremiumFeedback closeHandler={closeAfterTrialPremiumFeedbackHandler}></AfterTrialPremiumFeedback>
      )}
      {showSafariGuidePopup && <SafariGuide closeHandler={closeSafariGuideHandler}></SafariGuide>}
      {showTutorialPopup && <Tutorial closeHandler={closeTutorialHandler} showUpgradePopupHandler={showUpgradePopupHandler}></Tutorial>}

      {showCookiePopup && <CookiePopup closeHandler={closeCookiePopupHandler}></CookiePopup>}
      {showLoginPopup && <LoginPopup closeHandler={closeLoginPopup}></LoginPopup>}
      {showUpgradePopup && <UpgradePopup closeHandler={closeUpgradePopupHandler}></UpgradePopup>}
      {showActivationPopup && (
        <ActivationPopup closeHandler={closeActivationPopup} helpSupportClickHandler={openHelpSupportHandler}></ActivationPopup>
      )}
      {showFreeTrialPopup && <FreeTrialPopup closeHandler={closeFreeTrialPopup}></FreeTrialPopup>}
      {showLastDayTrialPopup && <LastDayTrialPopup closeHandler={closeLastDayTrialPopup}></LastDayTrialPopup>}
      {showExpirationPopup && <ExpirationPopup closeHandler={closeExpirationPopup}></ExpirationPopup>}
      {showHelpSupportPopup && <HelpSupportPopup closeHandler={closeHelpSupportHandler}></HelpSupportPopup>}
      {showFeedbackPopup && <FeedbackPopup closeHandler={closeFeedbackPopupHandler}></FeedbackPopup>}
      {showSubscriptionPopup && (
        <SubscriptionPopup
          closeHandler={closeSubscriptionHandler}
          activateHandler={activationBtnClickHandler}
          upgradeHandler={navBtnClickHandler}
        ></SubscriptionPopup>
      )}
    </>
  );
}

export default Popup;
