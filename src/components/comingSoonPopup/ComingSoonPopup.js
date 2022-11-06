import { useSelector } from 'react-redux';

import './ComingSoonPopup.scss';

import downloadIcon from '../../svg/ComingSoonPopup/Download icon.svg';
import shareIcon from '../../svg/ComingSoonPopup/Share icon.svg';
import discordIcon from '../../svg/ComingSoonPopup/Discord icon.svg';

function ComingSoonPopup(props) {
  const comingSoon = useSelector((store) => store.popup.comingSoon);

  let text = '';
  let img = '';

  if (comingSoon === 'download') {
    text = 'Download Wallpaper';
    img = downloadIcon;
  }

  if (comingSoon === 'share') {
    text = 'Let’s Share';
    img = shareIcon;
  }

  if (comingSoon === 'discord') {
    text = 'Checkpoint Discord';
    img = discordIcon;
  }

  return (
    <div className="coming-soon-popup">
      <div className="coming-soon-popup__body">
        <div className="coming-soon-popup__close-btn" onClick={props.closeHandler}></div>
        <img src={img} alt=""></img>
        <p className="coming-soon-popup__main-text">{text}</p>
        <p className="coming-soon-popup__coming-soon">Coming Soon</p>
      </div>
    </div>
  );
}

export default ComingSoonPopup;
