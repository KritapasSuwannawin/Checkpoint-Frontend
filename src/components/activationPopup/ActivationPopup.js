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

  const [invalidCode, setInvalidCode] = useState(false);
  const [codeAlreadyUsed, setCodeAlreadyUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorDuringAuthen, setErrorDuringAuthen] = useState(false);

  const activationCodeRef = useRef();

  function verifyHandler() {
    const activationCode = activationCodeRef.current.value;

    if (activationCode.length < 10) {
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

    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/account/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((body) => {
        const { statusCode, data } = body;

        if (statusCode !== 2001) {
          if (statusCode === 3004) {
            setCodeAlreadyUsed(true);
          }

          if (statusCode === 3005) {
            setInvalidCode(true);
          }

          if (statusCode === 4000) {
            throw new Error();
          }

          return;
        }

        const { premiumExpirationDate } = data;

        dispatch(memberActions.upgradeMember({ premiumExpirationDate }));
        props.closeHandler();
      })
      .catch(() => setErrorDuringAuthen(true))
      .finally(() => setLoading(false));
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
          <p className={`activation-popup__title`}>Activate Premium</p>
        ) : (
          <p className={`activation-popup__title`}>Extend Premium</p>
        )}
        <input className="activation-popup__input" type="text" ref={activationCodeRef} placeholder="Insert code here..."></input>
        {invalidCode && (
          <p className="activation-popup__error-msg">Your code is invalid. Please make sure that you input the correct code.</p>
        )}
        {codeAlreadyUsed && <p className="activation-popup__error-msg">This code has already been used</p>}
        <div className={`activation-popup__submit-btn`} onClick={verifyHandler}>
          {loading ? <img className="activation-popup__spinner" src={spinner} alt=""></img> : 'Activate'}
        </div>
        {errorDuringAuthen && <p className="activation-popup__error-msg">Error occured, please try again later</p>}
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
        <p className="activation-popup__ps">
          If you have any problems, feel free to contact us at <span onClick={props.helpSupportClickHandler}>Help & Support</span>.<br></br>
          We'll get back to you as soon as possible!
        </p>
      </div>
    </div>
  );
}

export default ActivationPopup;
