import { useSelector } from 'react-redux';

import './SubscriptionPopup.scss';

import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';

function SubscriptionPopup(props) {
  const isPremium = useSelector((store) => store.member.isPremium);
  const isOntrial = useSelector((store) => store.member.isOntrial);
  const premiumExpirationDate = useSelector((store) => store.member.premiumExpirationDate);

  return (
    <div className="subscription-popup">
      <div className="subscription-popup__container">
        <div className="subscription-popup__container--close-btn" onClick={props.closeHandler}></div>
        <p className="subscription-popup__container--title">Subscription</p>
        <div className="subscription-popup__plan">
          <img src={isPremium ? logoPremium50 : logo50} alt=""></img>
          <p className={`subscription-popup__plan--title ${isOntrial ? 'small' : ''}`}>
            {isOntrial ? 'Free Trial Premium Plan' : isPremium ? 'Premium Plan' : 'Standard Plan'}
          </p>
          <p className="subscription-popup__plan--desc">
            {isPremium
              ? `Will expire on ${new Date(premiumExpirationDate).getDate()}/${new Date(premiumExpirationDate).getMonth() + 1}/${new Date(
                  premiumExpirationDate
                ).getFullYear()}`
              : 'Free lifetime'}
          </p>
        </div>
        {isOntrial ? (
          <p className="subscription-popup__container--desc">
            Buy a digital coupon to continue enjoying<br></br>Premium perks after free-trial ends
          </p>
        ) : isPremium ? (
          <p className="subscription-popup__container--desc">Buy another digital coupon to extend your Premium subscription</p>
        ) : (
          <p className="subscription-popup__container--desc">Upgrade to Premium to enjoy full customization and much more content</p>
        )}
        <img className="subscription-popup__container--buy-premium" src={buyPremiumBtn} alt="" onClick={props.upgradeHandler}></img>
        <div className="subscription-popup__container--btn" onClick={props.activateHandler}>
          {isPremium ? 'Extend Premium' : 'Activate Premium'}
        </div>
        <p className="subscription-popup__container--ps">
          By continuing, you agree to our<br></br>
          <a href={`${window.location.href}term-condition`} target="_blank" rel="noreferrer">
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href={`${window.location.href}cancellation-refund-policy`} target="_blank" rel="noreferrer">
            Cancellation & Refund Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default SubscriptionPopup;
