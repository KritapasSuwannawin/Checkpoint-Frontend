import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Ambient.scss';

import { ambientActions } from '../../store/ambientSlice';

function Ambient() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);

  const ambientClickHandler = useCallback(
    (id, name, filePath, thumbnailFilePath, url) => {
      dispatch(ambientActions.ambientToggleHandler({ id, name, filePath, thumbnailFilePath, url }));
    },
    [dispatch]
  );

  useEffect(() => {
    availableAmbientArr.forEach((ambient) => {
      setThumbnailArr((thumbnailArr) => {
        const filteredThumbnailArr = thumbnailArr.filter((thumbnail) => thumbnail.key !== ambient.id);
        return [
          ...filteredThumbnailArr,
          <div key={ambient.id}>
            <SimpleThumbnailCard
              id={ambient.id}
              name={ambient.name}
              filePath={ambient.filePath}
              thumbnailFilePath={ambient.thumbnailFilePath}
              url={ambient.url}
              onClickHandler={ambientClickHandler}
              ambient
            ></SimpleThumbnailCard>
          </div>,
        ];
      });
    });
  }, [availableAmbientArr, ambientClickHandler]);

  return <div className={`ambient ${currentPage === 'ambient' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Ambient;
