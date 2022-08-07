import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

import starRegular from '../../svg/30px/star-regular.svg';
import starSolid from '../../svg/30px/star-solid.svg';

function TrialLastDayFeedback(props) {
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
  const ref8 = useRef();
  const ref9 = useRef();
  const ref10 = useRef();
  const ref11 = useRef();
  const ref12 = useRef();
  const ref13 = useRef();
  const ref14 = useRef();

  function submitHandler() {
    const data = {
      memberId,
      tableName: 'feedback_trial_last_day',
      music_quantity: ref1.current.checked,
      ambience_quantity: ref2.current.checked,
      background_quantity: ref3.current.checked,
      music_quality: ref4.current.checked,
      ambience_quality: ref5.current.checked,
      background_quality: ref6.current.checked,
      interface: ref7.current.checked,
      other_weakness: ref8.current.value,
      ambience_customization: ref9.current.checked,
      background_customization: ref10.current.checked,
      easy_to_use: ref11.current.checked,
      suggestion: ref12.current.value,
      star,
      wanted_feature: ref13.current.value,
      other_strength: ref14.current.value,
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

        <p className="feedback-popup__form--sub-heading">
          {!isJapanese ? 'What do you think should be improved?' : '改善すべき点は何だと思いますか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref1}></input>
          <label>{!isJapanese ? 'Selections of music' : '音楽の選択'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref2}></input>
          <label>{!isJapanese ? 'Selections of ambience' : 'アンビアンスの選択'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref3}></input>
          <label>{!isJapanese ? 'Selections of background' : '背景の選択'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref4}></input>
          <label>{!isJapanese ? 'Music quality' : '音楽の質'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref5}></input>
          <label>{!isJapanese ? 'Ambience quality' : 'アンビエンスの質'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref6}></input>
          <label>{!isJapanese ? 'Background quality' : '背景の質'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref7}></input>
          <label>{!isJapanese ? 'Interface' : 'インターフェース'}</label>
        </div>
        <input type="text" placeholder={!isJapanese ? 'Others' : 'その他'} ref={ref8}></input>

        <p className="feedback-popup__form--sub-heading">
          {!isJapanese ? 'What do you think is our strength?' : 'Checkpointの強みは何だと思いますか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref9}></input>
          <label>{!isJapanese ? 'Ambience customization' : 'カスタマイズ可能なアンビアンス'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref10}></input>
          <label>{!isJapanese ? 'Background customization' : 'カスタマイズ可能な背景'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref11}></input>
          <label>{!isJapanese ? 'Easy to use' : '使いやすさ'}</label>
        </div>
        <input type="text" placeholder={!isJapanese ? 'Others' : 'その他'} ref={ref14}></input>

        <p className="feedback-popup__form--sub-heading">
          {!isJapanese ? 'What do you want to see more in the future?' : '今後、さらに期待することは何ですか？'}
        </p>
        <input type="text" placeholder={!isJapanese ? 'Optional' : '任意'} ref={ref13}></input>

        <p className="feedback-popup__form--sub-heading">
          {!isJapanese ? 'Do you have any suggestions for us?' : '私たちに何かご提案がありますか？'}
        </p>
        <textarea
          placeholder={!isJapanese ? 'Optional' : '任意'}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref12}
        ></textarea>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          {!isJapanese ? 'Send' : '送信'}
        </div>
      </div>
    </div>
  );
}

export default TrialLastDayFeedback;
