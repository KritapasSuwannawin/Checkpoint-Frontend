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
    (id, name, filePath, thumbnailFilePath) => {
      dispatch(ambientActions.ambientToggleHandler({ id, name, filePath, thumbnailFilePath }));
    },
    [dispatch]
  );

  useEffect(() => {
    availableAmbientArr.forEach((ambient) => {
      setThumbnailArr((thumbnailArr) => [
        ...thumbnailArr,
        <div key={ambient.id}>
          <SimpleThumbnailCard
            id={ambient.id}
            name={ambient.name}
            filePath={ambient.filePath}
            thumbnailFilePath={ambient.thumbnailFilePath}
            onClickHandler={ambientClickHandler}
            ambient
          ></SimpleThumbnailCard>
        </div>,
      ]);
    });
  }, [availableAmbientArr, ambientClickHandler]);

  return <div className={`ambient ${currentPage === 'ambient' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Ambient;
