import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Background.scss';

function Background() {
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);

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
              ambientArr={background.ambientArr}
              background
            ></SimpleThumbnailCard>
          </div>,
        ];
      });
    });
  }, [availableBackgroundArr]);

  return <div className={`background ${currentPage === 'background' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Background;
