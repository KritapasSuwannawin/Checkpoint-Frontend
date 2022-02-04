import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MusicThumbnailCard from '../../components/musicThumbnailCard/MusicThumbnailCard';
import MusicCategoryCard from '../../components/musicCategoryCard/MusicCategoryCard';
import './Music.scss';

import { musicActions } from '../../store/musicSlice';

import backArrowSvg36 from '../../svg/36px/Back Arrow.svg';

function Music() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);

  const [thumbnailArr, setThumbnailArr] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [category, setCategory] = useState(null);

  const availableMusicArrRef = useRef();
  const categoryRef = useRef();

  const musicClickHandler = useCallback(
    (id) => {
      dispatch(musicActions.changeMusicHandler(id));
      dispatch(musicActions.setMusicCategory(category));
      dispatch(musicActions.setPlayFromPlaylist(false));
    },
    [dispatch, category]
  );

  useEffect(() => {
    if (
      JSON.stringify(availableMusicArrRef.current) === JSON.stringify(availableMusicArr) &&
      categoryRef.current === category
    ) {
      return;
    }

    availableMusicArrRef.current = availableMusicArr;
    categoryRef.current = category;

    setThumbnailArr([]);
    setCategoryArr([]);

    if (category) {
      availableMusicArr
        .filter((music) => music.category === category)
        .forEach((music) => {
          setThumbnailArr((thumbnailArr) => [
            ...thumbnailArr,
            <div key={music.id}>
              <MusicThumbnailCard
                id={music.id}
                musicName={music.musicName}
                artistName={music.artistName}
                url={music.url}
                thumbnailUrl={music.thumbnailUrl}
                onClickHandler={musicClickHandler}
              ></MusicThumbnailCard>
            </div>,
          ]);
        });

      return;
    }

    const temp1 = [];

    availableMusicArr.forEach((music) => {
      const category = music.category;
      if (!temp1.includes(category)) {
        temp1.push(category);
      }

      setThumbnailArr((thumbnailArr) => [
        ...thumbnailArr,
        <div key={music.id}>
          <MusicThumbnailCard
            id={music.id}
            musicName={music.musicName}
            artistName={music.artistName}
            url={music.url}
            thumbnailUrl={music.thumbnailUrl}
            onClickHandler={musicClickHandler}
          ></MusicThumbnailCard>
        </div>,
      ]);
    });

    const temp2 = temp1.map((category) => availableMusicArr.filter((music) => music.category === category));

    temp2.forEach((arr, i) => {
      const category = arr[0].category;
      const dataArr = arr.slice(0, 5);

      setCategoryArr((categoryArr) => [
        ...categoryArr,
        <div key={i} onClick={() => setCategory(category)}>
          <MusicCategoryCard category={category} dataArr={dataArr}></MusicCategoryCard>
        </div>,
      ]);
    });
  }, [availableMusicArr, musicClickHandler, category]);

  return (
    <div className={`music ${currentPage === 'music' ? 'current-page' : ''}`}>
      {category && (
        <div className="music__category-name">
          <img src={backArrowSvg36} alt="" onClick={() => setCategory(null)}></img>
          <p>{category}</p>
        </div>
      )}
      {thumbnailArr}
      {!category && <div className="music__category-container">{categoryArr}</div>}
    </div>
  );
}

export default Music;
