import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import SimpleThumbnailCard from '../../components/simpleThumbnailCard/SimpleThumbnailCard';
import './Avatar.scss';

function Avatar() {
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableAvatarArr = useSelector((store) => store.avatar.availableAvatarArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);
  const doneSetupPage = useRef();

  useEffect(() => {
    if (doneSetupPage.current) {
      return;
    }

    availableAvatarArr.forEach((avatar) => {
      setThumbnailArr((thumbnailArr) => {
        const filteredThumbnailArr = thumbnailArr.filter((thumbnail) => thumbnail.key !== avatar.id);
        return [
          ...filteredThumbnailArr,
          <div key={avatar.id}>
            <SimpleThumbnailCard id={avatar.id} thumbnailUrl={avatar.url} avatar></SimpleThumbnailCard>
          </div>,
        ];
      });
    });

    if (availableAvatarArr.length > 0) {
      doneSetupPage.current = true;
    }
  }, [availableAvatarArr]);

  return <div className={`avatar ${currentPage === 'avatar' ? 'current-page' : ''}`}>{thumbnailArr}</div>;
}

export default Avatar;
