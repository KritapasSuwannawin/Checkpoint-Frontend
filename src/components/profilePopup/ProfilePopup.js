import { useDispatch, useSelector } from 'react-redux';

import './ProfilePopup.scss';

import { popupActions } from '../../store/popupSlice';
import { pageActions } from '../../store/pageSlice';

import signInSvg from '../../svg/ProfilePopup/SignIn.svg';
import questionMarkSvg from '../../svg/ProfilePopup/Question Mark.svg';
import paperPlaneSvg from '../../svg/ProfilePopup/Paper Plane.svg';
import informationIconSvg from '../../svg/ProfilePopup/Information Icon.svg';
import checkpointLogoSvg from '../../svg/ProfilePopup/Checkpoint Logo.svg';
import policySvg from '../../svg/ProfilePopup/Policy.svg';
import logoutSvg from '../../svg/ProfilePopup/Logout.svg';
import crownSvg from '../../svg/ProfilePopup/Crown.svg';

function ProfilePopup(props) {
  const { logoutHandler } = props;

  const dispatch = useDispatch();

  const username = useSelector((store) => store.member.username);
  const memberId = useSelector((store) => store.member.memberId);
  const currentAvatar = useSelector((store) => store.avatar.currentAvatar);

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

  function openAvatarPageHander() {
    dispatch(pageActions.changePageHandler('avatar'));
  }

  return (
    <div className="profile-popup">
      {memberId && (
        <>
          <div className="profile-popup__profile-container">
            <img src={currentAvatar.url} alt="" onClick={openAvatarPageHander}></img>
            <div className="profile-popup__profile-container--right">
              <p className="username">{username}</p>
              <p className="member-id">{`#${memberId}`}</p>
            </div>
          </div>
        </>
      )}
      <a href="https://www.buymeacoffee.com/checkpoint" target="_blank" rel="noreferrer" className="profile-popup__support-us">
        <img src={crownSvg} alt="" className="profile-popup__support-us--icon"></img>
        <p className="profile-popup__support-us--text">Support Us</p>
      </a>
      {memberId && (
        <>
          <div className="profile-popup__container">
            <div className="profile-popup__icon-container">
              <img src={questionMarkSvg} alt=""></img>
            </div>
            <p onClick={openHelpSupportHandler}>Help & Support</p>
          </div>
          <div className="profile-popup__container">
            <div className="profile-popup__icon-container">
              <img src={paperPlaneSvg} alt=""></img>
            </div>
            <p onClick={openFeedbackHandler}>Feedback</p>
          </div>
        </>
      )}

      <div className={`profile-popup__container ${memberId ? 'border-top' : ''}`}>
        <div className="profile-popup__icon-container">
          <img src={informationIconSvg} alt=""></img>
        </div>
        <a href={`${window.location.href}about`} target="_blank" rel="noreferrer">
          About Us
        </a>
      </div>
      <div className="profile-popup__container">
        <div className="profile-popup__icon-container">
          <img src={policySvg} alt=""></img>
        </div>
        <a href={'https://forms.gle/rCnXynzSeH8WhMRC9'} target="_blank" rel="noreferrer">
          For Artist
        </a>
      </div>
      <div className="profile-popup__container">
        <div className="profile-popup__icon-container">
          <img src={checkpointLogoSvg} alt=""></img>
        </div>
        <a href={`${window.location.href}policy`} target="_blank" rel="noreferrer">
          Policies
        </a>
      </div>
      <div className="profile-popup__container border-top">
        <div className="profile-popup__icon-container">
          <img src={memberId ? logoutSvg : signInSvg} alt=""></img>
        </div>
        {memberId ? <p onClick={logoutHandler}>Sign Out</p> : <p onClick={loginHandler}>Sign In</p>}
      </div>
    </div>
  );
}

export default ProfilePopup;
