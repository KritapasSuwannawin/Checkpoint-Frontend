import { useSelector } from 'react-redux';

import './Premium.scss';

import bg from './bg.png';

import UpgradePopup from '../../components/upgradePopup/UpgradePopup';
import LoginPopup from '../../components/loginPopup/LoginPopup';

function Premium(props) {
  const memberId = useSelector((store) => store.member.memberId);

  return (
    <div className="premium-page">
      <img src={bg} alt=""></img>
      <div className="container">
        <p className="title">Premium</p>
        {memberId && (
          <p className="sub-title">What are you waiting for? Click “Upgrade” now to join our Premium family.</p>
        )}
      </div>
      {memberId ? <UpgradePopup premiumPage></UpgradePopup> : <LoginPopup signIn></LoginPopup>}
    </div>
  );
}

export default Premium;
