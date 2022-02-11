import './UpgradePopup.scss';

import SliderCard from './SliderCard';

import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';
import buyPremiumBtn from '../../svg/50px/buy-premium-button.png';
import communityreview from './img/Community Review For Web.png';

function UpgradePopup(props) {
  function closeHandler() {
    props.closeHandler();
  }

  return (
    <div className="upgrade-popup">
      <div className="upgrade-popup__container">
        <div className="upgrade-popup__close-btn" onClick={closeHandler}></div>
        <div className="upgrade-popup__nav">
          <div>
            <p className="upgrade-popup__nav--title">Upgrade to Checkpoint Premium</p>
            <p className="upgrade-popup__nav--sub-title">
              By continuing, you agree to our{' '}
              <a href={`${window.location.href}term-condition`} target="_blank" rel="noreferrer">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href={`${window.location.href}cancellation-refund-policy`} target="_blank" rel="noreferrer">
                Cancellation & Refund Policy
              </a>
            </p>
          </div>
          <img src={logoPremium50} alt=""></img>
        </div>
        <div className="upgrade-popup__cards">
          <div className="upgrade-popup__standard">
            <p className="upgrade-popup__cards--title">Standard</p>
            <p className="upgrade-popup__cards--price">$0</p>
            <div className="upgrade-popup__cards--btn" onClick={closeHandler}>
              Use Standard
            </div>
            <p className="upgrade-popup__cards--list">+ &nbsp;Ad-Free</p>
            <p className="upgrade-popup__cards--list">+ &nbsp;2 Peaceful Background</p>
            <p className="upgrade-popup__cards--list">+ &nbsp;6 Realistic Ambience</p>
            <p className="upgrade-popup__cards--list">- &nbsp;Fully Customizable Background</p>
            <p className="upgrade-popup__cards--list">- &nbsp;Fully Customizable Ambience</p>
          </div>
          <div className="upgrade-popup__premium">
            <div className="upgrade-popup__premium--container">
              <div className="upgrade-popup__premium--content">
                <p className="upgrade-popup__cards--title">Premium</p>
                <p className="upgrade-popup__cards--price">
                  ${process.env.REACT_APP_SUBSCRIPTION_PRICE} <span>/mo</span>
                </p>
                <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
                  <img src={buyPremiumBtn} alt="" className="upgrade-popup__cards--buy-premium"></img>
                </a>
                <p className="upgrade-popup__cards--list">+ &nbsp;Ad-Free</p>
                <p className="upgrade-popup__cards--list">+ &nbsp;7 Peaceful Background</p>
                <p className="upgrade-popup__cards--list">+ &nbsp;15 Realistic Ambience</p>
                <p className="upgrade-popup__cards--list">+ &nbsp;Fully Customizable Background</p>
                <p className="upgrade-popup__cards--list">+ &nbsp;Fully Customizable Ambience</p>
              </div>
              <SliderCard></SliderCard>
            </div>
            <p className="upgrade-popup__premium--ps">
              *0.01$ of every sale supports mental health organizations worldwide
            </p>
          </div>
        </div>
        <p className="upgrade-popup__community-review--title">Community Review</p>
        <img src={communityreview} alt="" className="upgrade-popup__community-review--img"></img>
      </div>
    </div>
  );
}

export default UpgradePopup;
