import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'react-load-script';

import './UpgradePopup.scss';

import { memberActions } from '../../store/memberSlice';

function UpgradePopup(props) {
  const dispatch = useDispatch();
  const memberId = useSelector((store) => store.member.memberId);
  const email = useSelector((store) => store.member.email);

  const [errorDuringUpgrading, setErrorDuringUpgrading] = useState(false);

  function closeHandler() {
    props.closeHandler();
  }

  function createCreditCardCharge(token) {
    const data = { memberId, email, token };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.active) {
          props.closeHandler();
          dispatch(memberActions.upgradeMember());
        } else {
          setErrorDuringUpgrading(true);
        }
      })
      .catch(() => {
        setErrorDuringUpgrading(true);
      });
  }

  function handleScriptLoad() {
    window.OmiseCard.configure({
      publicKey: process.env.REACT_APP_OMISE_PUBLIC_KEY,
      frameLabel: 'Checkpoint',
      submitLabel: 'Subscribe for',
      currency: 'usd',
    });
  }

  function creditCardConfigure() {
    window.OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: [],
    });
    window.OmiseCard.configureButton('#credit-card');
    window.OmiseCard.attach();
  }

  function omiseCardHandler() {
    window.OmiseCard.open({
      amount: 399,
      onCreateTokenSuccess: (token) => {
        createCreditCardCharge(token);
      },
      onFormClosed: () => {},
    });
  }

  function handleClick(e) {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
  }

  return (
    <div className="upgrade-popup">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      <form>
        <div className="upgrade-popup__close-btn" onClick={closeHandler}></div>
        <p className="upgrade-popup__title">Upgrade to premium!</p>
        <p className="upgrade-popup__content">3.99$ / month</p>
        <button id="credit-card" className="upgrade-popup__submit-btn" type="button" onClick={handleClick}>
          Upgrade
        </button>
        {errorDuringUpgrading && <p className="upgrade-popup__error-msg">Error occured, please try again later</p>}
      </form>
    </div>
  );
}

export default UpgradePopup;
