import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

import starRegular from '../../svg/30px/star-regular.svg';
import starSolid from '../../svg/30px/star-solid.svg';

function AfterTrialStandardFeedback(props) {
  const memberId = useSelector((store) => store.member.memberId);
  const isJapanese = useSelector((store) => store.language.isJapanese);

  const [star, setStar] = useState(3);

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
      star,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/feedback`, {
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

  function setReviewStar() {
    setStar(this);
  }

  return (
    <div className="feedback-popup">
      <div className="feedback-popup__form">
        <div className="feedback-popup__form--close-btn" onClick={closePopupHandler}></div>
        <p className="feedback-popup__form--heading">
          {!isJapanese ? 'Help us improve by giving us feedbacks!' : 'フィードバックで改善にご協力ください'}
        </p>

        <div className="feedback-popup__form--star-container">
          <img src={star > 0 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(1)}></img>
          <img src={star > 1 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(2)}></img>
          <img src={star > 2 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(3)}></img>
          <img src={star > 3 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(4)}></img>
          <img src={star > 4 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(5)}></img>
        </div>

        {!isJapanese ? (
          <p className="feedback-popup__form--sub-heading">
            Why you are sticking with standard plan <br></br> rather than going premium?
          </p>
        ) : (
          <p className="feedback-popup__form--sub-heading">
            なぜプレミアムではなく、<br></br> スタンダードプランにこだわっているのですか？
          </p>
        )}
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref1}></input>
          <label>
            {!isJapanese ? 'The features I get from standard plan are already enough' : 'スタンダードプランで得られる機能ですでに十分です'}
          </label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref2}></input>
          <label>{!isJapanese ? 'Premium plan is too expensive' : 'プレミアムプランは高すぎる'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref3}></input>
          <label>{!isJapanese ? "I don't use the service very often" : 'あまり利用しないので'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref4}></input>
          <label>{!isJapanese ? "I've decided to use another similar service" : '他の似たようなサービスを利用することにした'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref5}></input>
          <label>
            {!isJapanese ? "I don't think Premium subscription is worth the money" : 'プレミアムプランはお金を払う価値がないと思う'}
          </label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref6}></input>
          <label>{!isJapanese ? "I wasn't looking for this service" : 'このサービスを探していたわけではありません'}</label>
        </div>
        <input type="text" placeholder={!isJapanese ? 'Others' : 'その他'} ref={ref7}></input>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          {!isJapanese ? 'Send' : '送信'}
        </div>
      </div>
    </div>
  );
}

export default AfterTrialStandardFeedback;
