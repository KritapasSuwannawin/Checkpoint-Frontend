import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import firestore from '../../firebase/firestore';
import './ReviewPopup.scss';

const dictionary = {
  heading: ['Help us improve by giving us feedback!', 'サービス向上のため、ご意見をお聞かせください'],
  checkbox1: ['There are not enough selections of background', '背景イメージの種類が少ない'],
  checkbox2: ['There are not enough selections of music', '音楽の種類が少ない'],
  checkbox3: ['There are not enough selections of ambience', 'アンビエンスの選択が足りない'],
  checkbox4: ['The quality of background is not good enough', '背景のクオリティが低い'],
  checkbox5: ['The quality of music is not good enough', '楽曲の質が良くない'],
  checkbox6: ['The quality of ambience is not good enough', 'アンビエンスのクオリティが低い'],
  checkbox7: ['Slow download speed', 'ダウンロード速度が遅い'],
  checkbox8: ['The website is difficult to navigate', 'Webサイトが操作しづらい'],
  checkbox9: ['The operation of the website is not smooth', 'ウェブサイトが見づらい'],
  other: ['Other', 'その他'],
  ending: [
    'Lastly, if you would like to receive news regarding  our services and full release of the website, please write down your email below',
    '最後に、当社のサービスやウェブサイトに関する最新情報をご希望の方は、以下にEメールアドレスをご記入ください',
  ],
  email: ['email (optional)', 'Eメールアドレス（任意）'],
  send: ['Send', '届ける'],
};

function ReviewPopup(props) {
  const languageIndex = useSelector((store) => store.language.languageIndex);

  const [showReview, setShowReview] = useState(true);
  const [sendToFirestore, setSendToFirestore] = useState(true);

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

  function submitHandler() {
    setShowReview(false);
  }

  function closePopupHandler() {
    setShowReview(false);
    setSendToFirestore(false);
    localStorage.removeItem('checkpointShowReviewPopup');
  }

  if (!showReview) {
    if (ref1.current && sendToFirestore) {
      firestore.collection('beta-test-feedback').add({
        numberBackgroundNotEnough: ref1.current.checked ? 1 : 0,
        numberMusicNotEnough: ref2.current.checked ? 1 : 0,
        numberAmbienceNotEnough: ref3.current.checked ? 1 : 0,
        qualityBackgroundNotEnough: ref4.current.checked ? 1 : 0,
        qualityMusicNotEnough: ref5.current.checked ? 1 : 0,
        qualityAmbienceNotEnough: ref6.current.checked ? 1 : 0,
        slowDownloadSpeed: ref7.current.checked ? 1 : 0,
        difficultToNavigate: ref8.current.checked ? 1 : 0,
        operationNotSmooth: ref9.current.checked ? 1 : 0,
        otherSuggestion: ref10.current.value,
        email: ref11.current.value,
      });
    }
    return <></>;
  }

  return (
    <div className={`review-popup ${languageIndex === 1 ? 'japanese' : ''}`}>
      <form>
        <div className="review-popup__close-btn" onClick={closePopupHandler}></div>
        <p className="review-popup__heading">{dictionary.heading[languageIndex]}</p>
        <div>
          <input type="checkbox" value="1" ref={ref1}></input>
          <label>{dictionary.checkbox1[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="2" ref={ref2}></input>
          <label>{dictionary.checkbox2[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="3" ref={ref3}></input>
          <label>{dictionary.checkbox3[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="4" ref={ref4}></input>
          <label>{dictionary.checkbox4[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="5" ref={ref5}></input>
          <label>{dictionary.checkbox5[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="6" ref={ref6}></input>
          <label>{dictionary.checkbox6[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="7" ref={ref7}></input>
          <label>{dictionary.checkbox7[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="8" ref={ref8}></input>
          <label>{dictionary.checkbox8[languageIndex]}</label>
        </div>
        <div>
          <input type="checkbox" value="9" ref={ref9}></input>
          <label>{dictionary.checkbox9[languageIndex]}</label>
        </div>
        <textarea
          placeholder={dictionary.other[languageIndex]}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref10}
        ></textarea>
        <p>{dictionary.ending[languageIndex]}</p>
        <input type="text" placeholder={dictionary.email[languageIndex]} ref={ref11}></input>
        <div className="review-popup__submit" onClick={submitHandler}>
          {dictionary.send[languageIndex]}
        </div>
      </form>
    </div>
  );
}

export default ReviewPopup;
