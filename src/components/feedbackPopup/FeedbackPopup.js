import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './FeedbackPopup.scss';

import starRegular from '../../svg/30px/star-regular.svg';
import starSolid from '../../svg/30px/star-solid.svg';

function FeedbackPopup(props) {
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
  const ref15 = useRef();
  const ref16 = useRef();

  function submitHandler() {
    const data = {
      memberId,
      tableName: 'feedback',
      star,
      high_school: ref1.current.checked,
      college: ref2.current.checked,
      working: ref3.current.checked,
      other_job: ref4.current.value,
      less_than_one_week: ref5.current.checked,
      one_week: ref6.current.checked,
      almost_one_month: ref7.current.checked,
      more_than_one_month: ref8.current.checked,
      full_screen_browser: ref9.current.checked,
      minimized_browser: ref10.current.checked,
      half_screen_browser: ref11.current.checked,
      phone: ref12.current.checked,
      sleep: ref13.current.checked,
      productivity: ref14.current.checked,
      relax: ref15.current.checked,
      other_problem: ref16.current.value,
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
          {!isJapanese ? 'How would you describe yourself?' : 'あなたは以下のうちどれですか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref1} name="job"></input>
          <label>{!isJapanese ? 'High school student' : '高校生'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref2} name="job"></input>
          <label>{!isJapanese ? 'College student' : '大学生'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref3} name="job"></input>
          <label>{!isJapanese ? 'Working' : '社会人'}</label>
        </div>
        <input type="text" placeholder={!isJapanese ? 'Others' : 'その他'} ref={ref4}></input>

        <p className="feedback-popup__form--sub-heading">
          {!isJapanese ? 'How long have you been using Checkpoint.tokyo?' : 'Checkpoint.tokyoを使い始めてどのくらいになりますか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref5} name="duration"></input>
          <label>{!isJapanese ? 'Less than a week' : '1週間未満'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref6} name="duration"></input>
          <label>{!isJapanese ? 'A week' : '1週間'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref7} name="duration"></input>
          <label>{!isJapanese ? 'Almost 1 month' : 'ほぼ1ヶ月'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="radio" ref={ref8} name="duration"></input>
          <label>{!isJapanese ? 'More than 1 month' : '1ヶ月以上'}</label>
        </div>

        <p className="feedback-popup__form--sub-heading">
          {!isJapanese ? 'How do you use Checkpoint.tokyo?' : 'Checkpoint.tokyoをどのように使っていますか？'}
        </p>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref9}></input>
          <label>{!isJapanese ? 'With full-screen browser on my computer' : 'パソコンのフルスクリーンブラウザで'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref10}></input>
          <label>{!isJapanese ? 'With minimized browser on my computer' : 'パソコンの最小化されたブラウザで'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref11}></input>
          <label>{!isJapanese ? 'With half-screen browser on my computer' : 'パソコンの半画面ブラウザで'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref12}></input>
          <label>{!isJapanese ? 'With my Phone' : '携帯電話で'}</label>
        </div>

        {!isJapanese ? (
          <p className="feedback-popup__form--sub-heading">What problem does Checkpoint.tokyo solve for you?</p>
        ) : (
          <p className="feedback-popup__form--sub-heading">
            あなたにとって、 <br></br> Checkpoint.tokyoはどんな問題を解決しますか？
          </p>
        )}
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref13}></input>
          <label>{!isJapanese ? 'Checkpoint improves my sleep quality' : 'Checkpointは睡眠の質を向上させる'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref14}></input>
          <label>{!isJapanese ? 'Checkpoint increases my productivity' : '生産性の向上'}</label>
        </div>
        <div className="feedback-popup__form--checkbox-container">
          <input type="checkbox" ref={ref15}></input>
          <label>{!isJapanese ? 'Checkpoint makes me feel relaxed' : 'リラックスできる'}</label>
        </div>
        <input type="text" placeholder={!isJapanese ? 'Others' : 'その他'} ref={ref16}></input>

        <div className="feedback-popup__form--submit-btn" onClick={submitHandler}>
          {!isJapanese ? 'Send' : '送信'}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPopup;
