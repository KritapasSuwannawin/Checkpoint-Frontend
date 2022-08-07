import { useState } from 'react';
import { useSelector } from 'react-redux';

import './SafariGuide.scss';

import imageUrl from './Safari minigame.png';

function SafariGuide(props) {
  const [showGuide, setShowGuide] = useState(true);
  const loading = useSelector((store) => store.page.loading);
  const isJapanese = useSelector((store) => store.language.isJapanese);

  if (!showGuide || loading) {
    props.closeHandler();
  }

  function submitHandler() {
    setShowGuide(false);
  }

  return (
    <div className="safari-guide">
      <div className="safari-guide__content">
        <p>
          {!isJapanese
            ? 'For Safari users, please adjust the settings for the best experience!'
            : 'Safariをご利用の方は、設定を変更してください！'}
        </p>
        <img src={imageUrl} alt=""></img>
        <div className="safari-guide__done" onClick={submitHandler}>
          Done
        </div>
      </div>
    </div>
  );
}

export default SafariGuide;
