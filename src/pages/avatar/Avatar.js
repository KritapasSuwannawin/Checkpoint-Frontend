import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import AvatarCard from '../../components/avatarCard/AvatarCard';
import './Avatar.scss';

function Avatar() {
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableAvatarArr = useSelector((store) => store.avatar.availableAvatarArr);
  const backgroundNotCustomizable = useSelector((store) => store.background.backgroundNotCustomizable);

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
            <AvatarCard id={avatar.id} thumbnailUrl={avatar.url}></AvatarCard>
          </div>,
        ];
      });
    });

    if (availableAvatarArr.length > 0) {
      doneSetupPage.current = true;
    }
  }, [availableAvatarArr]);

  return (
    <div className={`avatar ${currentPage === 'avatar' ? 'current-page' : ''} ${backgroundNotCustomizable ? 'full-height' : ''}`}>
      {thumbnailArr}
    </div>
  );
}

export default Avatar;
