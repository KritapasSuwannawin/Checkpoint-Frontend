import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './SimpleThumbnailCard.scss';

import { ambientActions } from '../../store/ambientSlice';
import { backgroundActions } from '../../store/backgroundSlice';
import { avatarActions } from '../../store/avatarSlice';

import lockSvg from '../../svg/15px/Lock.svg';

function SimpleThumbnailCard(props) {
  const dispatch = useDispatch();
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const currentAvatar = useSelector((store) => store.avatar.currentAvatar);
  const languageIndex = useSelector((store) => store.language.languageIndex);
  const isPremium = useSelector((store) => store.member.isPremium);

  const [thumbnailUrl, setThumbnailUrl] = useState();

  useEffect(() => {
    setThumbnailUrl(props.thumbnailUrl);
  }, [props.thumbnailUrl]);

  const className = `simple-thumbnail-card ${
    props.ambient
      ? `ambient-card ${
          currentAmbientArr.findIndex((ambient) => ambient.id === props.id) >= 0 ? 'current-ambient' : ''
        }`
      : ''
  } ${props.background ? `background-card ${currentBackground.id === props.id ? 'current-background' : ''}` : ''} ${
    props.avatar ? `avatar-card ${currentAvatar.id === props.id ? 'current-avatar' : ''}` : ''
  }`;

  const placeholderClassName =
    'simple-thumbnail-placeholder ' +
    (props.background ? 'background-placeholder' : '') +
    (props.ambient ? 'ambient-placeholder' : '') +
    (props.avatar ? 'avatar-placeholder' : '');

  function clickHandler() {
    if (props.isPremium && !isPremium) {
      return;
    }

    if (props.background) {
      dispatch(backgroundActions.changeBackgroundHandler(props.id));
    } else if (props.ambient) {
      dispatch(ambientActions.ambientToggleHandler(props.id));
    } else if (props.avatar) {
      dispatch(avatarActions.changeAvatarHandler(props.id));
    }
  }

  if (!thumbnailUrl) {
    return <div className={placeholderClassName}></div>;
  }

  return (
    <div className={className}>
      {(props.background || props.ambient) && props.isPremium && !isPremium && (
        <div className="simple-thumbnail-card__premium" title="For premium member">
          <div className="simple-thumbnail-card__premium-overlay"></div>
          <img src={lockSvg} alt="" className={`simple-thumbnail-card__lock-svg ${props.ambient ? 'small' : ''}`}></img>
        </div>
      )}
      <img src={thumbnailUrl} onClick={clickHandler} className="simple-thumbnail-card__image" alt=""></img>
      {props.name && (
        <p onClick={clickHandler} className="simple-thumbnail-card__overlay-name">
          {languageIndex === 0 ? props.name : props.nameJapanese}
        </p>
      )}
    </div>
  );
}

export default SimpleThumbnailCard;
