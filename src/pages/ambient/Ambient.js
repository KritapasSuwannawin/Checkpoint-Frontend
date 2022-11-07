import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import AmbientCard from '../../components/ambientCard/AmbientCard';
import './Ambient.scss';

function Ambient(props) {
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const backgroundNotCustomizable = useSelector((store) => store.background.backgroundNotCustomizable);

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
            <AmbientCard
              id={ambient.id}
              name={ambient.name}
              whiteIconUrl={ambient.whiteIconUrl}
              blackIconUrl={ambient.blackIconUrl}
            ></AmbientCard>
          </div>,
        ];
      });
    });

    if (availableAmbientArr.length > 0) {
      doneSetupPage.current = true;
    }
  }, [availableAmbientArr]);

  return (
    <div className={`ambient ${currentPage === 'ambient' ? 'current-page' : ''} ${backgroundNotCustomizable ? 'full-height' : ''}`}>
      <p className="ambient__title">Ambience Customization </p>
      {thumbnailArr}
    </div>
  );
}

export default Ambient;
