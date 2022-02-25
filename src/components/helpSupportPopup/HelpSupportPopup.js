import { useRef } from 'react';
import { useSelector } from 'react-redux';

import './HelpSupportPopup.scss';

import logo from '../../svg/50px/Checkpoint with text 50px.svg';

function HelpSupportPopup(props) {
  const memberId = useSelector((store) => store.member.memberId);
  const languageIndex = useSelector((store) => store.language.languageIndex);

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

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(() => {});

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
        <p className="help-support-popup__form--heading">
          {languageIndex === 0 ? 'Help & Support' : 'ヘルプ＆サポート'}
        </p>

        <p className="help-support-popup__form--sub-heading">{languageIndex === 0 ? 'Your email' : 'メール'}</p>
        <input type="text" placeholder={languageIndex === 0 ? 'Email' : 'メール'} id="email" ref={ref1}></input>

        <p className="help-support-popup__form--sub-heading">{languageIndex === 0 ? 'Subject' : '主題'}</p>
        <input type="text" placeholder={languageIndex === 0 ? 'Subject' : '主題'} ref={ref2}></input>

        <p className="help-support-popup__form--sub-heading">{languageIndex === 0 ? 'Detail' : '詳細'}</p>
        <textarea
          placeholder={languageIndex === 0 ? 'Detail' : '詳細'}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref3}
        ></textarea>

        <p className="help-support-popup__form--ps">
          {languageIndex === 0 ? "We'll get back to you as soon as possible!" : 'できるだけ早くご連絡いたします!'}
        </p>

        <div className="help-support-popup__form--submit-btn" onClick={submitHandler}>
          {languageIndex === 0 ? 'Send' : '送信'}
        </div>
      </div>
    </div>
  );
}

export default HelpSupportPopup;
