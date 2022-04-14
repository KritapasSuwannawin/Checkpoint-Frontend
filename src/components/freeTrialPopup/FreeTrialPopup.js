import { useSelector } from 'react-redux';

import './FreeTrialPopup.scss';

import oneMonthImg from './img/Premium Card 1m.png';
import threeMonthImg from './img/Premium Card 3m.png';

function FreeTrialPopup(props) {
  const languageIndex = useSelector((store) => store.language.languageIndex);

  return (
    <div className="free-trial-popup">
      <div className="free-trial-popup__container">
        <p className="free-trial-popup__title">
          {languageIndex === 0 ? 'Your 7-Day Free Trial Has' : '7日間の無料トライアルを'} <br></br>{' '}
          <span>{languageIndex === 0 ? 'Started!' : '開始しました！'}</span>
        </p>
        {languageIndex === 0 ? (
          <p className="free-trial-popup__sub-title">You can now enjoy Premium perks with full customization and much more contents</p>
        ) : (
          <p className="free-trial-popup__sub-title">
            フルカスタマイズが可能なプレミアム特典や、<br></br>より充実したコンテンツをお楽しみいただけます
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
          {languageIndex === 0 ? 'Later' : '後で読む'}
        </div>
      </div>
    </div>
  );
}

export default FreeTrialPopup;
