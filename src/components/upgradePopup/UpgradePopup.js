import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './UpgradePopup.scss';

import { memberActions } from '../../store/memberSlice';

function UpgradePopup(props) {
  const dispatch = useDispatch();
  const memberId = useSelector((store) => store.member.memberId);

  const [errorDuringUpgrading, setErrorDuringUpgrading] = useState(false);

  function closeHandler() {
    props.closeHandler();
  }

  function submitHandler() {
    const data = { memberId };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setErrorDuringUpgrading(true);
        } else {
          props.closeHandler();
          dispatch(memberActions.upgradeMember());
        }
      })
      .catch(() => {
        setErrorDuringUpgrading(true);
      });
  }

  return (
    <div className="upgrade-popup">
      <form>
        <div className="upgrade-popup__close-btn" onClick={closeHandler}></div>
        <p className="upgrade-popup__title">Upgrade to premium!</p>
        <p className="upgrade-popup__content">3.99$ / month</p>
        <div className="upgrade-popup__submit-btn" onClick={submitHandler}>
          Upgrade
        </div>
        {errorDuringUpgrading && <p className="upgrade-popup__error-msg">Error occured, please try again later</p>}
      </form>
    </div>
  );
}

export default UpgradePopup;
