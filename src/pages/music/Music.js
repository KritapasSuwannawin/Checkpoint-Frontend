import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MusicThumbnailCard from '../../components/musicThumbnailCard/MusicThumbnailCard';
import './Music.scss';

import { musicActions } from '../../store/musicSlice';

function Music() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);

  const [thumbnailArr, setThumbnailArray] = useState([]);

  const musicClickHandler = useCallback(
    (id, musicName, artistName, filePath, thumbnailFilePath, url, thumbnailUrl) => {
      dispatch(
        musicActions.changeMusicHandler({ id, musicName, artistName, filePath, thumbnailFilePath, url, thumbnailUrl })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    availableMusicArr.forEach((music) => {
      setThumbnailArray((thumbnailArr) => {
        const filteredThumbnailArr = thumbnailArr.filter((thumbnail) => thumbnail.key !== music.id);
        return [
          ...filteredThumbnailArr,
          <div key={music.id}>
            <MusicThumbnailCard
              id={music.id}
              musicName={music.musicName}
              artistName={music.artistName}
              filePath={music.filePath}
              url={music.url}
              thumbnailUrl={music.thumbnailUrl}
              thumbnailFilePath={music.thumbnailFilePath}
              onClickHandler={musicClickHandler}
            ></MusicThumbnailCard>
          </div>,
        ];
      });
    });
  }, [availableMusicArr, musicClickHandler]);

  return <div className={`music ${currentPage === 'music' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Music;
