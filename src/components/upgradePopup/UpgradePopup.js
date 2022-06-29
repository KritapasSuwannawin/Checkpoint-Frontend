import { useSelector } from 'react-redux';

import './UpgradePopup.scss';

import SliderCard from './SliderCard';

import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';
import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import buyPremiumBtnJP from '../../svg/50px/Buy Premium Button JP.svg';
import communityreview from './img/Community Review For Web.png';

function UpgradePopup(props) {
  const languageIndex = useSelector((store) => store.language.languageIndex);

  function closeHandler() {
    props.closeHandler();
  }

  return (
    <div className="upgrade-popup">
      <div className="upgrade-popup__container">
        <div className="upgrade-popup__close-btn" onClick={closeHandler}></div>
        <div className="upgrade-popup__nav">
          <div>
            <p className="upgrade-popup__nav--title">
              {languageIndex === 0 ? 'Upgrade to Checkpoint Premium' : 'Checkpointプレミアムへのアップグレード'}
            </p>
            {languageIndex === 0 ? (
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
            ) : (
              <p className="upgrade-popup__nav--sub-title">
                継続することにより、お客様は当社の
                <a href={`${window.location.href}term-condition`} target="_blank" rel="noreferrer">
                  利用規約
                </a>
                と
                <a href={`${window.location.href}cancellation-refund-policy`} target="_blank" rel="noreferrer">
                  キャンセル・返金ポリシー
                </a>
                に同意したことになります
              </p>
            )}
          </div>
          <img src={logoPremium50} alt=""></img>
        </div>
        <div className="upgrade-popup__cards">
          <div className="upgrade-popup__standard">
            <p className="upgrade-popup__cards--title">{languageIndex === 0 ? 'Standard' : 'スタンダード'}</p>
            <p className="upgrade-popup__cards--price">
              <span className="price">$0</span>
            </p>
            <div className="upgrade-popup__cards--btn" onClick={closeHandler}>
              {languageIndex === 0 ? 'Use Standard' : 'スタンダードで使用する'}
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn"></div>
              {languageIndex === 0 ? 'Ad-Free' : '広告なし'}
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn"></div>
              {languageIndex === 0 ? '2 Peaceful Background' : '２平和な背景'}
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn"></div>
              {languageIndex === 0 ? '6 Realistic Ambience' : '6リアルなアンビエンス '}
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn-hollow"></div>
              {languageIndex === 0 ? 'Fully Customizable Background' : 'フルカスタマイズ可能な背景'}
            </div>
            <div className="upgrade-popup__cards--list">
              <div className="upgrade-popup__cards--list-btn-hollow"></div>
              {languageIndex === 0 ? 'Fully Customizable Ambience' : 'フルカスタマイズ可能なアンビエンス'}
            </div>
          </div>
          <div className="upgrade-popup__premium">
            <div className="upgrade-popup__premium--container">
              <div className="upgrade-popup__premium--content">
                <p className="upgrade-popup__cards--title">{languageIndex === 0 ? 'Premium' : 'プレミアム'}</p>
                <p className="upgrade-popup__cards--price line-through">
                  <span className="price line-through">${process.env.REACT_APP_SUBSCRIPTION_PRICE}</span>
                  <span className="small"> /mo</span>
                </p>
                <p className="upgrade-popup__cards--celebration">
                  <span>Early Launch Celebration!</span>
                </p>
                <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer">
                  <img
                    src={languageIndex === 0 ? buyPremiumBtn : buyPremiumBtnJP}
                    alt=""
                    className="upgrade-popup__cards--buy-premium"
                  ></img>
                </a>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {languageIndex === 0 ? 'Ad-Free' : '広告なし'}
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {languageIndex === 0 ? '7 Peaceful Background' : '７平和な背景'}
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {languageIndex === 0 ? '15 Realistic Ambience' : '１５リアルなアンビエンス'}
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {languageIndex === 0 ? 'Fully Customizable Background' : 'フルカスタマイズ可能な背景'}
                </div>
                <div className="upgrade-popup__cards--list">
                  <div className="upgrade-popup__cards--list-btn"></div>
                  {languageIndex === 0 ? 'Fully Customizable Ambience' : 'フルカスタマイズ可能なアンビエンス'}
                </div>
              </div>
              <SliderCard></SliderCard>
            </div>
            <p className="upgrade-popup__premium--ps">
              *
              {languageIndex === 0
                ? '0.01$ of every sale supports mental health organizations worldwide'
                : '売上高の0.01$は、世界中のメンタルヘルス関連団体を支援しています'}
            </p>
          </div>
        </div>
        <div className="upgrade-popup__community-review">
          <p className="upgrade-popup__community-review--title">{languageIndex === 0 ? 'Community Review' : 'コミュニティレビュー'}</p>
          <img src={communityreview} alt="" className="upgrade-popup__community-review--img"></img>
        </div>
      </div>
    </div>
  );
}

export default UpgradePopup;
