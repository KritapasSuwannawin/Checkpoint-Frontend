import { useState } from 'react';
import { useSelector } from 'react-redux';

import './SafariGuide.scss';

const imageUrl = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Safari+minigame.png`;

function SafariGuide(props) {
  const [showGuide, setShowGuide] = useState(true);
  const loading = useSelector((store) => store.page.loading);
  if (!showGuide || loading) {
    props.closeHandler();
  }

  function submitHandler() {
    localStorage.setItem('checkpointShowSafariPopup', '1');
    setShowGuide(false);
  }

  return (
    <div className="safari-guide">
      <div className="safari-guide__content">
        <p>For Safari users, please adjust the settings for the best experience!</p>
        <img src={imageUrl} alt=""></img>
        <div className="safari-guide__done" onClick={submitHandler}>
          Done
        </div>
      </div>
    </div>
  );
}

export default SafariGuide;
