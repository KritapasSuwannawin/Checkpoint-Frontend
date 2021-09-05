import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Ambient.scss';

function Ambient() {
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);

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
              ambient
            ></SimpleThumbnailCard>
          </div>,
        ];
      });
    });
  }, [availableAmbientArr]);

  return <div className={`ambient ${currentPage === 'ambient' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Ambient;
