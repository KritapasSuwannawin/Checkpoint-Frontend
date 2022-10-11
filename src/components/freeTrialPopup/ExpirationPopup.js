import './FreeTrialPopup.scss';

import oneMonthImg from './img/Premium Card 1m.png';
import threeMonthImg from './img/Premium Card 3m.png';

function ExpirationPopup(props) {
  return (
    <div className="free-trial-popup">
      <div className="free-trial-popup__container">
        <p className="free-trial-popup__title">
          Your Free Trial Has<br></br>
          <span className="red">Expired!</span>
        </p>
        <p className="free-trial-popup__sub-title">
          To continue enjoying Premium features, <br></br>
          buy a digital coupon here.
        </p>
        <div className="free-trial-popup__img-container">
          <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
            <img src={oneMonthImg} alt=""></img>
          </a>
          <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
            <img src={threeMonthImg} alt=""></img>
          </a>
        </div>
        <div className="free-trial-popup__btn" onClick={props.closeHandler}>
          Later
        </div>
      </div>
    </div>
  );
}

export default ExpirationPopup;
