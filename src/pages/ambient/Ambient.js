import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Ambient.scss';

function Ambient(props) {
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);
  const doneSetupPage = useRef();

  useEffect(() => {
    if (doneSetupPage.current) {
      return;
    }

    availableAmbientArr.forEach((ambient) => {
      setThumbnailArr((thumbnailArr) => {
        const filteredThumbnailArr = thumbnailArr.filter((thumbnail) => thumbnail.key !== ambient.id);
        return [
          ...filteredThumbnailArr,
          <div key={ambient.id}>
            <SimpleThumbnailCard
              id={ambient.id}
              name={ambient.name}
              thumbnailUrl={ambient.thumbnailUrl}
              volume={ambient.volume}
              ambient
            ></SimpleThumbnailCard>
          </div>,
        ];
      });
    });

    if (availableAmbientArr.length > 0) {
      doneSetupPage.current = true;
    }
  }, [availableAmbientArr]);

  return <div className={`ambient ${currentPage === 'ambient' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Ambient;
