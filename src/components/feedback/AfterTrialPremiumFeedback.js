import { useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

function AfterTrialPremiumFeedback(props) {
  const memberId = useSelector((store) => store.member.memberId);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();
  const ref9 = useRef();
  const ref10 = useRef();

  function submitHandler() {
    const data = {
      memberId,
      tableName: 'feedback_after_trial_premium',
      sleep: ref1.current.checked,
      productivity: ref2.current.checked,
      relax: ref3.current.checked,
      affordable: ref4.current.checked,
      quality: ref5.current.checked,
      other_reason: ref6.current.value,
      personalization: ref7.current.checked,
      one_stop_service: ref8.current.checked,
      other_value: ref9.current.value,
      suggestion: ref10.current.value,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/feedback`, {
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
    <div className="feedback-popup">
      <div className="feedback-popup__form">
        <div className="feedback-popup__form--close-btn" onClick={closePopupHandler}></div>
        <p className="feedback-popup__form--heading">Joining Premium Plan Feedback</p>

        <p className="feedback-popup__form--sub-heading">The reason you purchased Premium</p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref1}></input>
          <label>Checkpoint helps me sleep better</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref2}></input>
          <label>Checkpoint improves my productivity</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref3}></input>
          <label>Checkpoint makes me feel relaxed</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref4}></input>
          <label>Affordable service</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref5}></input>
          <label>Quality content</label>
        </div>
        <textarea
          placeholder="Others"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref6}
        ></textarea>

        <p className="feedback-popup__form--sub-heading">What do you think is the unique value of our service?</p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref7}></input>
          <label>Personalization</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref8}></input>
          <label>One-stop service</label>
        </div>
        <textarea
          placeholder="Others"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref9}
        ></textarea>

        <p className="feedback-popup__form--sub-heading">Suggestion</p>
        <textarea
          placeholder="Suggestion (not require)"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref10}
        ></textarea>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          Send
        </div>
      </div>
    </div>
  );
}

export default AfterTrialPremiumFeedback;
