import { useSelector, useDispatch } from 'react-redux';

import './AvatarCard.scss';

import { avatarActions } from '../../store/avatarSlice';

function AvatarCard(props) {
  const dispatch = useDispatch();
  const currentAvatar = useSelector((store) => store.avatar.currentAvatar);

  function clickHandler() {
    dispatch(avatarActions.changeAvatarHandler(props.id));
  }

  return (
    <div className={`avatar-card ${currentAvatar.id === props.id ? 'current-avatar' : ''}`}>
      <img src={props.thumbnailUrl} onClick={clickHandler} className="avatar-card__image" alt=""></img>
    </div>
  );
}

export default AvatarCard;
