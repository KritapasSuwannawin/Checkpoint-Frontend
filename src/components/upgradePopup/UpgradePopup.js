import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './UpgradePopup.scss';

import SliderCard from './SliderCard';

import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';
import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import freeTrialBtn from '../../svg/50px/Free Trial Button.svg';

import { memberActions } from '../../store/memberSlice';
import { popupActions } from '../../store/popupSlice';

const communityreview = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Community+Review+For+Web.png`;

function UpgradePopup(props) {
  const dispatch = useDispatch();
  const ambientCount = useSelector((store) => store.ambient.count);
  const backgroundCount = useSelector((store) => store.background.count);
  const memberId = useSelector((store) => store.member.memberId);
  const registrationDate = useSelector((store) => store.member.registrationDate);
  const premiumExpirationDate = useSelector((store) => store.member.premiumExpirationDate);
  const trialStartDate = useSelector((store) => store.member.trialStartDate);
  const isPremium = useSelector((store) => store.member.isPremium);

  const [loading, setLoading] = useState(false);

  let showFreeTrialBtn = false;
  if (!isPremium && !trialStartDate && registrationDate === premiumExpirationDate) {
    showFreeTrialBtn = true;
  }

  function closeHandler() {
    props.closeHandler();
  }

  function freeTrialClickHandler() {
    if (loading) {
      return;
    }

    setLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/account/trial/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memberId }),
    })
      .then((res) => res.json())
      .then((body) => {
        const { statusCode, data } = body;

        if (statusCode !== 2001) {
          if (statusCode === 4000) {
            throw new Error();
          }

          return;
        }

        const { trialStartDate, premiumExpirationDate } = data;

        dispatch(memberActions.startFreeTrial({ trialStartDate, premiumExpirationDate }));
        dispatch(popupActions.setShowFreeTrialPopup(true));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  return (
    <div className="upgrade-popup">
      <div
        className="upgrade-popup__container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),
      url('${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Premium+Card+Background.jpg')`,
        }}
      >
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
            <p className="upgrade-popup__cards--price">
              <span className="price">$0</span>
            </p>
            <div className="upgrade-popup__cards--btn" onClick={closeHandler}>
              Use Standard
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn"></div>
              Ad-Free
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn"></div>4 Peaceful Background
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn"></div>
              {`${ambientCount} Realistic Ambience`}
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn-hollow"></div>
              Fully Customizable Background
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn-hollow"></div>
              Fully Customizable Ambience
            </div>
          </div>
          <div className="upgrade-popup__premium">
            <div className="upgrade-popup__premium--container">
              <div className="upgrade-popup__premium--content">
                <p className="upgrade-popup__cards--title">Premium</p>
                <p className="upgrade-popup__cards--price line-through">
                  <span className="price line-through">${process.env.REACT_APP_SUBSCRIPTION_PRICE}</span>
                  <span className="small"> /mo</span>
                </p>
                <p className="upgrade-popup__cards--celebration">
                  <span>Early Launch Celebration!</span>
                </p>
                {showFreeTrialBtn ? (
                  <img src={freeTrialBtn} alt="" className="upgrade-popup__cards--buy-premium" onClick={freeTrialClickHandler}></img>
                ) : (
                  <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
                    <img src={buyPremiumBtn} alt="" className="upgrade-popup__cards--buy-premium"></img>
                  </a>
                )}
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  Ad-Free
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {`${backgroundCount} Peaceful Background`}
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {`${ambientCount} Realistic Ambience`}
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  Fully Customizable Background
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  Fully Customizable Ambience
                </div>
              </div>
              <SliderCard></SliderCard>
            </div>
            <p className="upgrade-popup__premium--ps">*0.01$ of every sale supports mental health organizations worldwide</p>
          </div>
        </div>
        <div className="upgrade-popup__community-review">
          <p className="upgrade-popup__community-review--title">Community Review</p>
          <img src={communityreview} alt="" className="upgrade-popup__community-review--img"></img>
        </div>
      </div>
    </div>
  );
}

export default UpgradePopup;
