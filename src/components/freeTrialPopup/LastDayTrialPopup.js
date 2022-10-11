import './FreeTrialPopup.scss';

import oneMonthImg from './img/Premium Card 1m.png';
import threeMonthImg from './img/Premium Card 3m.png';

function LastDayTrialPopup(props) {
  return (
    <div className="free-trial-popup">
      <div className="free-trial-popup__container">
        <p className="free-trial-popup__title">
          Your Premium subscription<br></br>
          <span className="yellow">will expire in 1 day</span>
        </p>
        <p className="free-trial-popup__sub-title">
          Buy another coupon here and redeem a code<br></br>
          to continue enjoying Premium perks in the next month
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

export default LastDayTrialPopup;
