import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MusicCard from '../../components/musicCard/MusicCard';
import MusicCategoryCard from '../../components/musicCategoryCard/MusicCategoryCard';
import MoodCard from '../../components/moodCard/MoodCard';
import './Music.scss';

import { musicActions } from '../../store/musicSlice';

import backArrowSvg36 from '../../svg/Music/Back Arrow.svg';
import playSvg from '../../svg/Music/Circled Play.svg';
import pauseSvg from '../../svg/Music/Pause Button.svg';

function Music() {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.page.currentPage);
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);
  const availableMoodArr = useSelector((store) => store.music.availableMoodArr);
  const musicPlaying = useSelector((store) => store.music.musicPlaying);
  const musicCategory = useSelector((store) => store.music.musicCategory);

  const [thumbnailArr, setThumbnailArr] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [category, setCategory] = useState();

  const [moodCardArr, setMoodCardArr] = useState([]);

  const availableMusicArrRef = useRef();
  const categoryRef = useRef();

  const isCategoryPlaying = musicPlaying && category === musicCategory;

  useEffect(() => {
    setMoodCardArr(
      availableMoodArr.map((mood) => (
        <div key={mood.id}>
          <MoodCard id={mood.id} name={mood.name} url={mood.url}></MoodCard>
        </div>
      ))
    );
  }, [availableMoodArr]);

  const musicClickHandler = useCallback(
    (id) => {
      dispatch(musicActions.changeMusicHandler(id));
      dispatch(musicActions.setMusicCategory(category));
    },
    [dispatch, category]
  );

  useEffect(() => {
    if (JSON.stringify(availableMusicArrRef.current) === JSON.stringify(availableMusicArr) && categoryRef.current === category) {
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
              <MusicCard
                id={music.id}
                musicName={music.musicName}
                artistName={music.artistName}
                url={music.url}
                thumbnailUrl={music.thumbnailUrl}
                onClickHandler={musicClickHandler}
              ></MusicCard>
            </div>,
          ]);
        });

      return;
    }

    const categoryArr = [];
    availableMusicArr.forEach((music) => {
      const category = music.category;
      if (!categoryArr.includes(category)) {
        categoryArr.push(category);
      }
    });

    categoryArr
      .map((category) => availableMusicArr.filter((music) => music.category === category))
      .forEach((arr, i) => {
        const category = arr[0].category;
        const dataArr = arr.slice(0, 5);

        setCategoryArr((categoryArr) => [
          ...categoryArr,
          <div key={i}>
            <MusicCategoryCard category={category} dataArr={dataArr} setCategoryHandler={setCategory}></MusicCategoryCard>
          </div>,
        ]);
      });
  }, [availableMusicArr, musicClickHandler, category]);

  function playPauseCategoryHandler() {
    if (isCategoryPlaying) {
      dispatch(musicActions.setMusicPlaying(false));
    } else {
      const filteredMusicArr = availableMusicArr.filter((music) => music.category === category);
      const music = filteredMusicArr[Math.floor(Math.random() * filteredMusicArr.length)];

      dispatch(musicActions.changeMusicHandler(music.id));
      dispatch(musicActions.setMusicCategory(category));
    }
  }

  return (
    <div className={`music ${currentPage === 'music' ? 'current-page' : ''}`}>
      {category ? (
        <>
          <div className="music__category-title">
            <img src={backArrowSvg36} alt="" className="music__category-title--back-btn" onClick={() => setCategory(null)}></img>
            <p>{category}</p>
            <img
              src={isCategoryPlaying ? pauseSvg : playSvg}
              alt=""
              className="music__category-title--play-pause-btn"
              onClick={playPauseCategoryHandler}
            ></img>
          </div>
          {thumbnailArr}
        </>
      ) : (
        <>
          <div className="music__mood-card-container">{moodCardArr}</div>
          <p className="music__title">All Music</p>
        </>
      )}
      {!category && <div className="music__category-container">{categoryArr}</div>}
    </div>
  );
}

export default Music;
