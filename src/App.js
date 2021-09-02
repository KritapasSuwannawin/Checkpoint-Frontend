import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from './firebase/storage';
import Loading from './pages/loading/Loading';
import Home from './pages/home/Home';
import Background from './pages/background/Background';
import Music from './pages/music/Music';
import Ambient from './pages/ambient/Ambient';

import { backgroundActions } from './store/backgroundSlice';
import { ambientActions } from './store/ambientSlice';
import { musicActions } from './store/musicSlice';

function App() {
  const dispatch = useDispatch();
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);

  useEffect(() => {
    const newAvailableBackgroundArr = availableBackgroundArr.map(async (background) => {
      const url = await storageRef.child(background.filePath).getDownloadURL();
      return { ...background, url };
    });

    const newAvailableAmbientArr = availableAmbientArr.map(async (ambient) => {
      const url = await storageRef.child(ambient.filePath).getDownloadURL();
      return { ...ambient, url };
    });

    const newAvailableMusicArr = availableMusicArr.map(async (music) => {
      const url = await storageRef.child(music.filePath).getDownloadURL();
      return { ...music, url };
    });

    newAvailableBackgroundArr.forEach(async (backgroundPromise) => {
      const background = await new Promise((resolve) => backgroundPromise.then((background) => resolve(background)));
      dispatch(backgroundActions.setAvailableBackground(background));
    });

    newAvailableAmbientArr.forEach(async (ambientPromise) => {
      const ambient = await new Promise((resolve) => ambientPromise.then((ambient) => resolve(ambient)));
      dispatch(ambientActions.setAvailableAmbient(ambient));
    });

    newAvailableMusicArr.forEach(async (musicPromise) => {
      const music = await new Promise((resolve) => musicPromise.then((music) => resolve(music)));
      dispatch(musicActions.setAvailableMusic(music));
    });
  }, [availableBackgroundArr, availableAmbientArr, availableMusicArr, dispatch]);

  return (
    <>
      <Loading></Loading>
      <Home></Home>
      <Background></Background>
      <Music></Music>
      <Ambient></Ambient>
    </>
  );
}

export default App;
