import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

import starRegular from '../../svg/30px/star-regular.svg';
import starSolid from '../../svg/30px/star-solid.svg';

function FiveMinuteFeedback(props) {
  const memberId = useSelector((store) => store.member.memberId);
  const languageIndex = useSelector((store) => store.language.languageIndex);

  const [star, setStar] = useState(3);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();

  function submitHandler() {
    const data = {
      memberId,
      tableName: 'feedback_five_minute',
      star,
      ad: ref1.current.checked,
      social_media: ref2.current.checked,
      friend: ref3.current.checked,
      otherWay: ref4.current.value,
      sleep: ref5.current.checked,
      productivity: ref6.current.checked,
      relax: ref7.current.checked,
      other_interest: ref8.current.value,
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

  function setReviewStar() {
    setStar(this);
  }

  return (
    <div className="feedback-popup">
      <div className="feedback-popup__form">
        <div className="feedback-popup__form--close-btn" onClick={closePopupHandler}></div>
        <p className="feedback-popup__form--heading">
          {languageIndex === 0 ? 'First Impression Feedback' : '第一印象のフィードバック'}
        </p>

        <div className="feedback-popup__form--star-container">
          <img src={star > 0 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(1)}></img>
          <img src={star > 1 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(2)}></img>
          <img src={star > 2 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(3)}></img>
          <img src={star > 3 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(4)}></img>
          <img src={star > 4 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(5)}></img>
        </div>

        <p className="feedback-popup__form--sub-heading">
          {languageIndex === 0
            ? 'How did you first know about Checkpoint.tokyo?'
            : 'Checkpoint.tokyo を知ったきっかけは？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref1}></input>
          <label>{languageIndex === 0 ? 'Advertisements' : '広告の掲載'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref3}></input>
          <label>{languageIndex === 0 ? 'Recommendation from friends/family' : '友人・家族からの勧め'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref2}></input>
          <label>
            {languageIndex === 0 ? 'Posts on social media (ads excluded)' : 'ソーシャルメディア上の投稿（広告を除く）'}
          </label>
        </div>
        <input type="text" placeholder={languageIndex === 0 ? 'Others' : 'その他'} ref={ref4}></input>

        <p className="feedback-popup__form--sub-heading">
          {languageIndex === 0
            ? 'Why are you interested in Checkpoint.tokyo?'
            : 'なぜCheckpoint.tokyoに興味を持たれたのでしょうか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref5}></input>
          <label>
            {languageIndex === 0 ? 'Checkpoint improves my sleep quality' : 'Checkpointは睡眠の質を向上させる'}
          </label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref6}></input>
          <label>{languageIndex === 0 ? 'Checkpoint increases my productivity' : '生産性の向上'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref7}></input>
          <label>{languageIndex === 0 ? 'Checkpoint makes me feel relaxed' : 'リラックスできる'}</label>
        </div>
        <input type="text" placeholder={languageIndex === 0 ? 'Others' : 'その他'} ref={ref8}></input>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          {languageIndex === 0 ? 'Send' : '送信'}
        </div>
      </div>
    </div>
  );
}

export default FiveMinuteFeedback;
