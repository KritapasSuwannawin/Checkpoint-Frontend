// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { storageRef } from './firebase/storage';
import Loading from './pages/loading/Loading';
import Home from './pages/home/Home';
import Background from './pages/background/Background';
import Music from './pages/music/Music';
import Ambient from './pages/ambient/Ambient';

// import { backgroundActions } from './store/backgroundSlice';
// import { ambientActions } from './store/ambientSlice';
// import { musicActions } from './store/musicSlice';

function App() {
  // const dispatch = useDispatch();
  // let availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);
  // let availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  // let availableMusicArr = useSelector((store) => store.music.availableMusicArr);

  // useEffect(() => {
  //   availableBackgroundArr = availableBackgroundArr.map(async (background) => {
  //     const url = await storageRef.child(background.filePath).getDownloadURL();
  //     return { ...background, url };
  //   });

  //   availableAmbientArr = availableAmbientArr.map(async (ambient) => {
  //     const url = await storageRef.child(ambient.filePath).getDownloadURL();
  //     return { ...ambient, url };
  //   });

  //   availableMusicArr = availableMusicArr.map(async (music) => {
  //     const url = await storageRef.child(music.filePath).getDownloadURL();
  //     return { ...music, url };
  //   });

  //   console.log(availableBackgroundArr);
  //   console.log(availableAmbientArr);
  //   console.log(availableMusicArr);
  // }, [availableBackgroundArr, availableAmbientArr, availableMusicArr]);

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
