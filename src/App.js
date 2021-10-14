import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from './firebase/storage';
import Loading from './pages/loading/Loading';
import Home from './pages/home/Home';
import Background from './pages/background/Background';
import Music from './pages/music/Music';
import Ambient from './pages/ambient/Ambient';
import ReviewPopup from './components/reviewPopup/ReviewPopup';

import { backgroundActions } from './store/backgroundSlice';
import { ambientActions } from './store/ambientSlice';
import { musicActions } from './store/musicSlice';

function App() {
  const dispatch = useDispatch();
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);

  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const notDoUseEffect = useRef();

  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

  useEffect(() => {
    if (notDoUseEffect.current || isMobileDevice) {
      return;
    }

    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
      console.log('You are using Safari 😥');
    } else {
      console.log('You are not using Safari 😄');
    }

    const newAvailableAmbientArr = availableAmbientArr.map(async (ambient) => {
      const url = await storageRef.child(ambient.filePath).getDownloadURL();
      const thumbnailUrl = await storageRef.child(ambient.thumbnailFilePath).getDownloadURL();
      return { ...ambient, url, thumbnailUrl };
    });

    const newAvailableMusicArr = availableMusicArr.map(async (music) => {
      const url = await storageRef.child(music.filePath).getDownloadURL();
      const thumbnailUrl = await storageRef.child(music.thumbnailFilePath).getDownloadURL();
      return { ...music, url, thumbnailUrl };
    });

    const newAvailableBackgroundArr = availableBackgroundArr.map(async (background) => {
      const url = await storageRef.child(background.filePath).getDownloadURL();
      const thumbnailUrl = await storageRef.child(background.thumbnailFilePath).getDownloadURL();
      return { ...background, url, thumbnailUrl };
    });

    newAvailableAmbientArr.forEach(async (ambientPromise) => {
      const ambient = await new Promise((resolve) => ambientPromise.then((ambient) => resolve(ambient)));
      dispatch(ambientActions.setAvailableAmbient(ambient));
    });

    newAvailableMusicArr.forEach(async (musicPromise) => {
      const music = await new Promise((resolve) => musicPromise.then((music) => resolve(music)));
      dispatch(musicActions.setAvailableMusic(music));
    });

    newAvailableBackgroundArr.forEach(async (backgroundPromise) => {
      const background = await new Promise((resolve) => backgroundPromise.then((background) => resolve(background)));
      dispatch(backgroundActions.setAvailableBackground(background));
    });

    setTimeout(() => {
      setShowReviewPopup(true);
    }, 10000);

    notDoUseEffect.current = true;
  }, [availableAmbientArr, availableBackgroundArr, availableMusicArr, isMobileDevice, dispatch]);

  if (isMobileDevice) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Loading></Loading>
      {showReviewPopup && <ReviewPopup></ReviewPopup>}
      <Home></Home>
      <Background></Background>
      <Music></Music>
      <Ambient></Ambient>
    </>
  );
}

export default App;
