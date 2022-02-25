import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ActivationPopup.scss';

import { memberActions } from '../../store/memberSlice';

import logoPremium50 from '../../svg/50px/Checkpoint premium 50px.svg';
import spinner from '../../svg/20px/spinner-solid.svg';

function ActivationPopup(props) {
  const dispatch = useDispatch();
  const memberId = useSelector((store) => store.member.memberId);
  const isPremium = useSelector((store) => store.member.isPremium);
  const isOntrial = useSelector((store) => store.member.isOntrial);
  const languageIndex = useSelector((store) => store.language.languageIndex);

  const [invalidCode, setInvalidCode] = useState(false);
  const [codeAlreadyUsed, setCodeAlreadyUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorDuringAuthen, setErrorDuringAuthen] = useState(false);

  const activationCodeRef = useRef();

  function verifyHandler() {
    const activationCode = activationCodeRef.current.value;

    if (activationCode.length !== 10) {
      setInvalidCode(true);
      return;
    } else {
      setInvalidCode(false);
    }

    setLoading(true);
    setErrorDuringAuthen(false);
    setInvalidCode(false);
    setCodeAlreadyUsed(false);

    const data = { memberId, activationCode };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/activation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        const { message: errorMessage, premiumExpirationDate } = result;

        setErrorDuringAuthen(errorMessage === 'error during authentication');
        setInvalidCode(errorMessage === 'invalid code');
        setCodeAlreadyUsed(errorMessage === 'code already used');

        if (!errorMessage) {
          dispatch(memberActions.upgradeMember({ premiumExpirationDate }));
          props.closeHandler();
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorDuringAuthen(true);
      });
  }

  function closeHandler() {
    props.closeHandler();
  }

  return (
    <div className="activation-popup">
      <div className="activation-popup__container">
        <div className="activation-popup__close-btn" onClick={closeHandler}></div>
        <img src={logoPremium50} alt=""></img>
        {!isPremium || isOntrial ? (
          <p className={`activation-popup__title`}>{languageIndex === 0 ? 'Activate Premium' : 'プレミアムの有効化'}</p>
        ) : (
          <p className={`activation-popup__title`}>{languageIndex === 0 ? 'Extend Premium' : 'プレミアムの延長'}</p>
        )}
        <input
          className="activation-popup__input"
          type="text"
          ref={activationCodeRef}
          placeholder={languageIndex === 0 ? 'Insert code here...' : 'ここにコードを入力してください...'}
        ></input>
        {invalidCode && (
          <p className="activation-popup__error-msg">
            {languageIndex === 0
              ? 'Your code is invalid. Please make sure that you input the correct code.'
              : 'コードが無効です。正しいコードを入力してください'}
          </p>
        )}
        {codeAlreadyUsed && (
          <p className="activation-popup__error-msg">
            {languageIndex === 0 ? 'This code has already been used' : 'このコードはすでに使われています'}
          </p>
        )}
        <div className={`activation-popup__submit-btn ${languageIndex !== 0 ? 'small' : ''}`} onClick={verifyHandler}>
          {loading ? (
            <img className="activation-popup__spinner" src={spinner} alt=""></img>
          ) : languageIndex === 0 ? (
            'Activate'
          ) : (
            'アクティベート'
          )}
        </div>
        {errorDuringAuthen && (
          <p className="activation-popup__error-msg">
            {languageIndex === 0
              ? 'Error occured, please try again later'
              : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
          </p>
        )}
        {languageIndex === 0 ? (
          <p className="activation-popup__ps">
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
          <p className="activation-popup__ps">
            継続することにより、お客様は当社の<br></br>
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
        {languageIndex === 0 ? (
          <p className="activation-popup__ps">
            If you have any problems, feel free to contact us at{' '}
            <span onClick={props.helpSupportClickHandler}>Help & Support</span>.<br></br>
            We'll get back to you as soon as possible!
          </p>
        ) : (
          <p className="activation-popup__ps">
            何か問題がある場合は、
            <span onClick={props.helpSupportClickHandler}>ヘルプ＆サポート</span>
            <br></br>
            までお気軽にお問い合わせください。できるだけ早くご返信いたします
          </p>
        )}
      </div>
    </div>
  );
}

export default ActivationPopup;
