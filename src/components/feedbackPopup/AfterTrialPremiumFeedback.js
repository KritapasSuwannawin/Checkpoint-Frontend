import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

import starRegular from '../../svg/30px/star-regular.svg';
import starSolid from '../../svg/30px/star-solid.svg';

function AfterTrialPremiumFeedback(props) {
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
  const ref9 = useRef();
  const ref10 = useRef();
  const ref11 = useRef();
  const ref12 = useRef();
  const ref13 = useRef();
  const ref14 = useRef();
  const ref15 = useRef();
  const ref16 = useRef();

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
      relaxing_music: ref10.current.checked,
      peaceful_art: ref11.current.checked,
      realistic_ambience: ref12.current.checked,
      background_customization: ref13.current.checked,
      ambience_customization: ref14.current.checked,
      easy_to_use: ref15.current.checked,
      other_feature: ref16.current.value,
      star,
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
          {languageIndex === 0 ? 'Welcome to the Premium family!' : 'プレミアムファミリーへようこそ！'}
        </p>

        <div className="feedback-popup__form--star-container">
          <img src={star > 0 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(1)}></img>
          <img src={star > 1 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(2)}></img>
          <img src={star > 2 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(3)}></img>
          <img src={star > 3 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(4)}></img>
          <img src={star > 4 ? starSolid : starRegular} alt="" onClick={setReviewStar.bind(5)}></img>
        </div>

        <p className="feedback-popup__form--sub-heading">
          {languageIndex === 0 ? 'The reason you purchased Premium' : 'プレミアムを購入した理由'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref1}></input>
          <label>{languageIndex === 0 ? 'Helps me sleep better' : 'Checkpointは睡眠の質を向上させる'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref2}></input>
          <label>{languageIndex === 0 ? 'Improves my productivity' : '生産性の向上'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref3}></input>
          <label>{languageIndex === 0 ? 'Makes me feel relaxed' : 'リラックスできる'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref4}></input>
          <label>{languageIndex === 0 ? 'Affordable service' : '手頃な価格帯のサービス'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref5}></input>
          <label>{languageIndex === 0 ? 'Quality content' : '良質なコンテンツ'}</label>
        </div>
        <input type="text" placeholder={languageIndex === 0 ? 'Others' : 'その他'} ref={ref6}></input>

        {languageIndex === 0 ? (
          <p className="feedback-popup__form--sub-heading">
            What features of Checkpoint do you think <br></br> enhance your experience?
          </p>
        ) : (
          <p className="feedback-popup__form--sub-heading">
            Checkpointのどのような機能が、<br></br> あなたのリラックス体験を向上させると思いますか？
          </p>
        )}
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref10}></input>
          <label>{languageIndex === 0 ? 'Relaxing music' : 'リラックスできる音楽'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref11}></input>
          <label>{languageIndex === 0 ? 'Peaceful background' : '平和な背景'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref12}></input>
          <label>{languageIndex === 0 ? 'Realistic ambience' : 'リアルなアンビアンス'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref13}></input>
          <label>{languageIndex === 0 ? 'Background customization' : 'カスタマイズ可能な背景'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref14}></input>
          <label>{languageIndex === 0 ? 'Ambience customization' : 'カスタマイズ可能なアンビアンス '}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref15}></input>
          <label>{languageIndex === 0 ? 'Easy to use' : '使いやすさ'}</label>
        </div>
        <input type="text" placeholder={languageIndex === 0 ? 'Others' : 'その他'} ref={ref16}></input>

        <p className="feedback-popup__form--sub-heading">
          {languageIndex === 0
            ? 'The unique value of our service?'
            : 'Checkpointのサービスのユニークな価値は何だと思いますか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref7}></input>
          <label>{languageIndex === 0 ? 'Personalization' : 'パーソナライゼーション'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref8}></input>
          <label>
            {languageIndex === 0 ? 'All-in-one relaxing platform' : 'オールインワンリラックスプラットフォーム'}
          </label>
        </div>
        <input type="text" placeholder={languageIndex === 0 ? 'Others' : 'その他'} ref={ref9}></input>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          {languageIndex === 0 ? 'Send' : '送信'}
        </div>
      </div>
    </div>
  );
}

export default AfterTrialPremiumFeedback;
