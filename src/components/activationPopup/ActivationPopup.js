import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ActivationPopup.scss';

import { memberActions } from '../../store/memberSlice';

import spinner from '../../svg/20px/spinner-solid.svg';

function ActivationPopup(props) {
  const dispatch = useDispatch();
  const memberId = useSelector((store) => store.member.memberId);

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
        const errorMessage = result.message;

        setErrorDuringAuthen(errorMessage === 'error during authentication');
        setInvalidCode(errorMessage === 'invalid code');
        setCodeAlreadyUsed(errorMessage === 'code already used');

        if (!errorMessage) {
          dispatch(memberActions.upgradeMember());
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
        <p className={`activation-popup__title`}>Premium Activation</p>
        <input
          className="activation-popup__input"
          type="text"
          ref={activationCodeRef}
          placeholder="Activation code"
        ></input>
        {invalidCode && <p className="activation-popup__error-msg">Invalid verification code</p>}
        {codeAlreadyUsed && <p className="activation-popup__error-msg">This code has already been used</p>}
        <div className="activation-popup__submit-btn" onClick={verifyHandler}>
          {loading ? <img className="activation-popup__spinner" src={spinner} alt=""></img> : 'Activate'}
        </div>
        {errorDuringAuthen && <p className="activation-popup__error-msg">Error occured, please try again later</p>}
      </div>
    </div>
  );
}

export default ActivationPopup;
