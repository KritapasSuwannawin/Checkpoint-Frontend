import { useSelector, useDispatch } from 'react-redux';

import './SimpleBackgroundCard.scss';

import { backgroundActions } from '../../store/backgroundSlice';
import { popupActions } from '../../store/popupSlice';

import lockSvg from '../../svg/SimpleBackgroundCard/Lock.svg';
import logoSvg from '../../svg/SimpleBackgroundCard/Logo.svg';

function SimpleBackgroundCard(props) {
  const { id, name, thumbnailUrl, artistName, isMember } = props;

  const dispatch = useDispatch();
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const memberId = useSelector((store) => store.member.memberId);

  function clickHandler() {
    if (isMember && !memberId) {
      dispatch(popupActions.setShowLoginPopup(true));
      return;
    }

    dispatch(backgroundActions.changeBackgroundHandler(id));
  }

  const isCurrent = currentBackground.id === id;

  return (
    <div className={`simple-background-card ${`${isCurrent ? 'current-background' : ''}`}`} onClick={clickHandler}>
      {isMember && !memberId && (
        <div className="simple-background-card__member" title="For member">
          <div className="simple-background-card__member-overlay"></div>
          <img src={lockSvg} alt="" className="simple-background-card__lock-svg"></img>
        </div>
      )}
      <img src={thumbnailUrl} className="simple-background-card__image" alt=""></img>
      <p className={`simple-background-card__name ${`${isCurrent ? 'current-background' : ''}`}`}>{name}</p>
      <div className="simple-background-card__bottom">
        <img className="simple-background-card__bottom--logo" src={logoSvg} alt=""></img>
        <div className={`simple-background-card__bottom--right ${`${isCurrent ? 'current-background' : ''}`}`}>
          <p className="artist-name">{artistName}</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleBackgroundCard;
