import './MobileLanding.scss';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import imageUrl from './mobileBackground.png';

function MobileLanding(props) {
  return (
    <div className="mobile-landing">
      <div className="mobile-landing__content">
        <img src={imageUrl} alt="" className="mobile-landing__content--background"></img>
        <img src={logo50} alt="" className="mobile-landing__content--logo"></img>
        <p className="mobile-landing__content--heading">Coming Soon</p>
        <p className="mobile-landing__content--paragraph">
          Our website is only available for computer users during a beta test.
        </p>
        <p className="mobile-landing__content--paragraph">A mobile application of Checkpoint is coming soon.</p>
      </div>
    </div>
  );
}

export default MobileLanding;
