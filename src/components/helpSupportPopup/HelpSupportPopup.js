import { useRef } from 'react';
import { useSelector } from 'react-redux';

import './HelpSupportPopup.scss';

import logo from '../../svg/50px/Checkpoint with text 50px.svg';

function HelpSupportPopup(props) {
  const memberId = useSelector((store) => store.member.memberId);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  function submitHandler() {
    const data = {
      memberId,
      email: ref1.current.value,
      subject: ref2.current.value,
      detail: ref3.current.value,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((body) => {
        const { statusCode } = body;

        if (statusCode !== 2000) {
          if (statusCode === 4000) {
            throw new Error();
          }

          return;
        }
      })
      .catch(() => {});

    props.closeHandler();
  }

  function closePopupHandler() {
    props.closeHandler();
  }

  return (
    <div className="help-support-popup">
      <div className="help-support-popup__form">
        <div className="help-support-popup__form--close-btn" onClick={closePopupHandler}></div>
        <img src={logo} alt="" className="help-support-popup__form--logo"></img>
        <p className="help-support-popup__form--heading">Help & Support</p>

        <p className="help-support-popup__form--sub-heading">Your email</p>
        <input type="text" placeholder="Email" id="email" ref={ref1}></input>

        <p className="help-support-popup__form--sub-heading">Subject</p>
        <input type="text" placeholder="Subject" ref={ref2}></input>

        <p className="help-support-popup__form--sub-heading">Detail</p>
        <textarea placeholder="Detail" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" ref={ref3}></textarea>

        <p className="help-support-popup__form--ps">We'll get back to you as soon as possible!</p>

        <div className="help-support-popup__form--submit-btn" onClick={submitHandler}>
          Send
        </div>
      </div>
    </div>
  );
}

export default HelpSupportPopup;
