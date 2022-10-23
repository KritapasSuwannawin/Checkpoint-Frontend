import { useSelector, useDispatch } from 'react-redux';

import './AmbientCard.scss';

import { ambientActions } from '../../store/ambientSlice';

function AmbientCard(props) {
  const { id, name, whiteIconUrl, blackIconUrl } = props;

  const dispatch = useDispatch();
  const currentAmbientArr = useSelector((store) => store.ambient.currentAmbientArr);

  function clickHandler() {
    dispatch(ambientActions.ambientToggleHandler(id));
  }

  const isCurrent = currentAmbientArr.findIndex((ambient) => ambient.id === id) !== -1;

  return (
    <div
      className={`ambient-card 
    ${isCurrent ? 'current-ambient' : ''}`}
      onClick={clickHandler}
    >
      <img src={isCurrent ? blackIconUrl : whiteIconUrl} className="ambient-card__image" alt=""></img>
      <p className="ambient-card__name">{name}</p>
    </div>
  );
}

export default AmbientCard;
