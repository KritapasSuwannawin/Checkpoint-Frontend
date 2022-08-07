import { useSelector } from 'react-redux';

import './FreeTrialPopup.scss';

import oneMonthImg from './img/Premium Card 1m.png';
import threeMonthImg from './img/Premium Card 3m.png';

function ExpirationPopup(props) {
  const isJapanese = useSelector((store) => store.language.isJapanese);

  return (
    <div className="free-trial-popup">
      <div className="free-trial-popup__container">
        <p className="free-trial-popup__title">
          {!isJapanese ? 'Your Free Trial Has' : '無料トライアルは'} <br></br>{' '}
          <span className="red">{!isJapanese ? 'Expired!' : '終了しました！'}</span>
        </p>
        {!isJapanese ? (
          <p className="free-trial-popup__sub-title">
            To continue enjoying Premium features, <br></br>
            buy a digital coupon here.
          </p>
        ) : (
          <p className="free-trial-popup__sub-title">
            引き続きプレミアム機能をお楽しみいただくには、<br></br>
            こちらからデジタルクーポンをご購入ください。
          </p>
        )}
        <div className="free-trial-popup__img-container">
          <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
            <img src={oneMonthImg} alt=""></img>
          </a>
          <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
            <img src={threeMonthImg} alt=""></img>
          </a>
        </div>
        <div className="free-trial-popup__btn" onClick={props.closeHandler}>
          {!isJapanese ? 'Later' : '後で読む'}
        </div>
      </div>
    </div>
  );
}

export default ExpirationPopup;
