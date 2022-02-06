import { useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

function AfterTrialStandardFeedback(props) {
  const memberId = useSelector((store) => store.member.memberId);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();

  function submitHandler() {
    const data = {
      memberId,
      tableName: 'feedback_after_trial_standard',
      feature_already_enough: ref1.current.checked,
      expensive: ref2.current.checked,
      rarely_use: ref3.current.checked,
      use_other_service: ref4.current.checked,
      not_worth_money: ref5.current.checked,
      not_looking_for: ref6.current.checked,
      other: ref7.current.value,
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
        <p className="feedback-popup__form--heading">After Free Trial Feedback</p>

        <p className="feedback-popup__form--sub-heading">Why you are sticking with standard plan?</p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref1}></input>
          <label>The features I get from standard plan are already enough</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref2}></input>
          <label>Premium plan is too expensive</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref3}></input>
          <label>I don't use the service very often</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref4}></input>
          <label>I've decided to use another similar service</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref5}></input>
          <label>I don't think Premium subscription is worth the money</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref6}></input>
          <label>I wasn't looking for this service</label>
        </div>
        <textarea
          placeholder="Others"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref7}
        ></textarea>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          Send
        </div>
      </div>
    </div>
  );
}

export default AfterTrialStandardFeedback;
