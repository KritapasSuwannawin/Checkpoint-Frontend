import './MobileLanding.scss';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';

function MobileLanding(props) {
  return (
    <div className="mobile-landing">
      <img src={logo50} alt="" className="mobile-landing__logo"></img>
      <p className="mobile-landing__heading">Coming Soon</p>
      <p className="mobile-landing__paragraph">Our website is only available for computer users during a beta test.</p>
      <p className="mobile-landing__paragraph">A mobile application of Checkpoint is coming soon.</p>
    </div>
  );
}

export default MobileLanding;
