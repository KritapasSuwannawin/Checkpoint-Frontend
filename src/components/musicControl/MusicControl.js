import { useSelector, useDispatch } from 'react-redux';

import FavouriteMusicCard from '../../components/favouriteMusicCard/FavouriteMusicCard';

import './MusicControl.scss';

import { popupActions } from '../../store/popupSlice';

import heartFullSvg from '../../svg/MusicControl/Heart.svg';

function MusicControl(props) {
  const dispatch = useDispatch();
  const memberId = useSelector((store) => store.member.memberId);
  const favouriteMusicIdArr = useSelector((store) => store.music.favouriteMusicIdArr);
  const backgroundNotCustomizable = useSelector((store) => store.background.backgroundNotCustomizable);

  function placeholderClickHandler() {
    dispatch(popupActions.setShowLoginPopup(true));
  }

  return (
    <div className={`music-control ${backgroundNotCustomizable ? 'full-height' : ''}`}>
      {!memberId ? (
        <p className="music-control__placeholder" onClick={placeholderClickHandler}>
          Join us to have your own music playlist
        </p>
      ) : (
        <>
          <div className="music-control__title">
            <img src={heartFullSvg} alt=""></img>
            <p>Favorite music</p>
          </div>
          {favouriteMusicIdArr.length === 0 ? (
            <p>Your music playlist is empty.</p>
          ) : (
            favouriteMusicIdArr.map((id) => (
              <div key={id} className="music-control__cards">
                <FavouriteMusicCard id={id}></FavouriteMusicCard>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default MusicControl;
