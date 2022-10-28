import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SimpleBackgroundCard from '../../components/simpleBackgroundCard/SimpleBackgroundCard';
import './Background.scss';

function Background() {
  const currentPage = useSelector((store) => store.page.currentPage);
  const currentBackground = useSelector((store) => store.background.currentBackground);
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);
  const availableBackgroundCategoryArr = useSelector((store) => store.background.availableBackgroundCategoryArr);

  const [categoryArr, setCategoryArr] = useState([]);

  useEffect(() => {
    const categoryArr = availableBackgroundCategoryArr.map((cat) => {
      return {
        ...cat,
        thumbnailArr: availableBackgroundArr
          .filter((bg) => bg.categoryId === cat.id && bg.id.slice(-2) === currentBackground.id.slice(-2))
          .map((bg) => (
            <div key={bg.id}>
              <SimpleBackgroundCard
                id={bg.id}
                name={bg.name}
                thumbnailUrl={bg.thumbnailUrl}
                artistName={bg.artistName}
                isMember={bg.isMember}
              ></SimpleBackgroundCard>
            </div>
          )),
      };
    });

    categoryArr.unshift({
      id: 0,
      name: 'Top Hit',
      thumbnailArr: availableBackgroundArr
        .filter((bg) => bg.isTopHit && bg.id.slice(-2) === currentBackground.id.slice(-2))
        .map((bg) => (
          <div key={bg.id}>
            <SimpleBackgroundCard
              id={bg.id}
              name={bg.name}
              thumbnailUrl={bg.thumbnailUrl}
              artistName={bg.artistName}
              isMember={bg.isMember}
            ></SimpleBackgroundCard>
          </div>
        )),
    });

    setCategoryArr(categoryArr);
  }, [availableBackgroundArr, availableBackgroundCategoryArr, currentBackground]);

  return (
    <div className={`background ${currentPage === 'background' ? 'current-page' : ''}`}>
      {categoryArr.map((cat) => (
        <div key={cat.id} className="background__section">
          <p className="background__section--title">{cat.name}</p>
          <div className="background__section--container">{cat.thumbnailArr}</div>
        </div>
      ))}
    </div>
  );
}

export default Background;
