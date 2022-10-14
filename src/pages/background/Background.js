import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Background.scss';

function Background() {
  const currentPage = useSelector((store) => store.page.currentPage);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);
  const deviceId = useSelector((store) => store.device.deviceId);

  const [thumbnailArr, setThumbnailArr] = useState([]);

  useEffect(() => {
    availableBackgroundArr.forEach((temp) => {
      const background = { ...temp };

      if (background.id.slice(2) !== currentBackground.id.slice(2)) {
        return;
      }

      setThumbnailArr((thumbnailArr) => {
        const filteredThumbnailArr = thumbnailArr.filter(
          (thumbnail) => thumbnail.key !== background.id && thumbnail.key.slice(2) === currentBackground.id.slice(2)
        );
        return [
          ...filteredThumbnailArr,
          <div key={background.id}>
            <SimpleThumbnailCard
              id={background.id}
              url={background.url}
              thumbnailUrl={background.thumbnailUrl}
              isMember={background.isPremium}
              background
            ></SimpleThumbnailCard>
          </div>,
        ];
      });
    });
  }, [availableBackgroundArr, currentBackground, deviceId]);

  return <div className={`background ${currentPage === 'background' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Background;
