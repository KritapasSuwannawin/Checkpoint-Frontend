import { useState, useRef } from 'react';

import firestore from '../../firebase/firestore';
import './ReviewPopup.scss';

function ReviewPopup(props) {
  const [showReview, setShowReview] = useState(true);

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

  if (!showReview) {
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
    return <></>;
  }

  return (
    <div className="review-popup">
      <form>
        <p className="review-popup__heading">Help us improve by giving us feedback!</p>
        <div>
          <input type="checkbox" value="1" ref={ref1}></input>
          <label>There are not enough selections of background</label>
        </div>
        <div>
          <input type="checkbox" value="2" ref={ref2}></input>
          <label>There are not enough selections of music</label>
        </div>
        <div>
          <input type="checkbox" value="3" ref={ref3}></input>
          <label>There are not enough selections of ambience</label>
        </div>
        <div>
          <input type="checkbox" value="4" ref={ref4}></input>
          <label>The quality of background is not good enough</label>
        </div>
        <div>
          <input type="checkbox" value="5" ref={ref5}></input>
          <label>The quality of music is not good enough</label>
        </div>
        <div>
          <input type="checkbox" value="6" ref={ref6}></input>
          <label>The quality of ambience is not good enough</label>
        </div>
        <div>
          <input type="checkbox" value="7" ref={ref7}></input>
          <label>Slow download speed</label>
        </div>
        <div>
          <input type="checkbox" value="8" ref={ref8}></input>
          <label>The website is difficult to navigate</label>
        </div>
        <div>
          <input type="checkbox" value="9" ref={ref9}></input>
          <label>The operation of the website is not smooth</label>
        </div>
        <textarea
          placeholder="Other"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          ref={ref10}
        ></textarea>
        <p>
          Lastly, if you would like to receive news regarding <br /> our services and full release of the website,
          <br /> please write down your email below
        </p>
        <input type="text" placeholder="email (optional)" ref={ref11}></input>
        <div className="review-popup__submit" onClick={submitHandler}>
          Send
        </div>
      </form>
    </div>
  );
}

export default ReviewPopup;
