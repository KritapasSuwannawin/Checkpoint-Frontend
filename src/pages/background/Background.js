import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Background.scss';

import { backgroundActions } from '../../store/backgroundSlice';

function Background() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);

  const backgroundClickHandler = useCallback(
    (id, filePath, thumbnailFilePath, url) => {
      dispatch(backgroundActions.changeBackgroundHandler({ id, filePath, thumbnailFilePath, url }));
    },
    [dispatch]
  );

  useEffect(() => {
    availableBackgroundArr.forEach((background) => {
      setThumbnailArr((thumbnailArr) => {
        const filteredThumbnailArr = thumbnailArr.filter((thumbnail) => thumbnail.key !== background.id);
        return [
          ...filteredThumbnailArr,
          <div key={background.id}>
            <SimpleThumbnailCard
              id={background.id}
              filePath={background.filePath}
              thumbnailFilePath={background.thumbnailFilePath}
              url={background.url}
              onClickHandler={backgroundClickHandler}
              background
            ></SimpleThumbnailCard>
          </div>,
        ];
      });
    });
  }, [availableBackgroundArr, backgroundClickHandler]);

  return <div className={`background ${currentPage === 'background' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Background;
