import { useSelector } from 'react-redux';

import './SubscriptionPopup.scss';

import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import buyPremiumBtnJP from '../../svg/50px/Buy Premium Button JP.svg';
import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';

function SubscriptionPopup(props) {
  const { isPremium, isOntrial, premiumExpirationDate } = useSelector((store) => store.member);
  const languageIndex = useSelector((store) => store.language.languageIndex);

  return (
    <div className="subscription-popup">
      <div className="subscription-popup__container">
        <div className="subscription-popup__container--close-btn" onClick={props.closeHandler}></div>
        <p className="subscription-popup__container--title">{languageIndex === 0 ? 'Subscription' : 'サブスクリプション'}</p>
        <div className="subscription-popup__plan">
          <img src={isPremium ? logoPremium50 : logo50} alt=""></img>
          <p className={`subscription-popup__plan--title ${isOntrial ? 'small' : ''}`}>
            {isOntrial
              ? languageIndex === 0
                ? 'Free Trial Premium Plan'
                : 'プレミアムプラン無料体験'
              : isPremium
              ? languageIndex === 0
                ? 'Premium Plan'
                : 'プレミアムプラン'
              : languageIndex === 0
              ? 'Standard Plan'
              : 'スタンダードプラン'}
          </p>
          <p className="subscription-popup__plan--desc">
            {isPremium
              ? `${languageIndex === 0 ? 'Will expire on' : '有効期限は'} ${new Date(premiumExpirationDate).getDate()}/${
                  new Date(premiumExpirationDate).getMonth() + 1
                }/${new Date(premiumExpirationDate).getFullYear()} ${languageIndex === 0 ? '' : 'です'}`
              : languageIndex === 0
              ? 'Free lifetime'
              : 'ライフタイム無料'}
          </p>
        </div>
        {isOntrial ? (
          languageIndex === 0 ? (
            <p className="subscription-popup__container--desc">
              Buy a digital coupon to continue enjoying <br></br> Premium perks after free-trial ends
            </p>
          ) : (
            <p className="subscription-popup__container--desc">
              ジタルクーポンを購入すると、<br></br>無料トライアル終了後も引き続きプレミアム特典をお楽しみいただけます
            </p>
          )
        ) : isPremium ? (
          <p className="subscription-popup__container--desc">
            {languageIndex === 0
              ? 'Buy another digital coupon to extend your Premium subscription'
              : '別のデジタルクーポンを購入し、プレミアムを延長する'}
          </p>
        ) : languageIndex === 0 ? (
          <p className="subscription-popup__container--desc">Upgrade to Premium to enjoy full customization and much more content</p>
        ) : (
          <p className="subscription-popup__container--desc">
            プレミアムにアップグレードすると、フルカスタマイズが可能になり、<br></br>
            より多くのコンテンツを楽しむことができます
          </p>
        )}
        <img
          className="subscription-popup__container--buy-premium"
          src={languageIndex === 0 ? buyPremiumBtn : buyPremiumBtnJP}
          alt=""
          onClick={props.upgradeHandler}
        ></img>
        <div className="subscription-popup__container--btn" onClick={props.activateHandler}>
          {isPremium
            ? languageIndex === 0
              ? 'Extend Premium'
              : 'プレミアムの延長'
            : languageIndex === 0
            ? 'Activate Premium'
            : 'プレミアムの有効化'}
        </div>
        {languageIndex === 0 ? (
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
        ) : (
          <p className="subscription-popup__container--ps">
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
    </div>
  );
}

export default SubscriptionPopup;
