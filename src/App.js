import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { storageRef } from './firebase/storage';
import firestore from './firebase/firestore';
import Loading from './pages/loading/Loading';
import Home from './pages/home/Home';
import Background from './pages/background/Background';
import Music from './pages/music/Music';
import Ambient from './pages/ambient/Ambient';
import ReviewPopup from './components/reviewPopup/ReviewPopup';
import MobileLanding from './components/mobileLanding/MobileLanding';
import SafariGuide from './components/safariGuide/SafariGuide';

import { backgroundActions } from './store/backgroundSlice';
import { ambientActions } from './store/ambientSlice';
import { musicActions } from './store/musicSlice';

function App() {
  const dispatch = useDispatch();
  const availableBackgroundArr = useSelector((store) => store.background.availableBackgroundArr);
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const availableMusicArr = useSelector((store) => store.music.availableMusicArr);

  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showSafariGuide, setShowSafariGuide] = useState(false);

  const notDoUseEffect = useRef();

  function mobileOrTabletCheck() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  const isMobileDevice =
    /Mobi/i.test(window.navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform) ||
    typeof window.orientation !== 'undefined' ||
    mobileOrTabletCheck();

  useEffect(() => {
    if (notDoUseEffect.current || isMobileDevice) {
      return;
    }

    if (window.location.protocol === 'http:' && window.location.href !== 'http://localhost:3000/') {
      window.location.replace(window.location.href.replace('http:', 'https:'));
    }

    firestore
      .collection('website-control')
      .doc('storage')
      .onSnapshot((doc) => {
        const allowRead = doc.data().allowRead;

        if (!allowRead) {
          window.location.replace('https://checkpoint-tokyo.netlify.app/');
        }
      });

    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
      if (!localStorage.getItem('checkpointShowSafariGuide')) {
        setShowSafariGuide(true);
        localStorage.setItem('checkpointShowSafariGuide', 'done');
      }
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
      if (!localStorage.getItem('checkpointShowReviewPopup')) {
        setShowReviewPopup(true);
        localStorage.setItem('checkpointShowReviewPopup', 'done');
      }
    }, 900000);

    notDoUseEffect.current = true;
  }, [availableAmbientArr, availableBackgroundArr, availableMusicArr, isMobileDevice, dispatch]);

  if (isMobileDevice) {
    return <MobileLanding></MobileLanding>;
  }

  return (
    <>
      <Loading></Loading>
      {showReviewPopup && <ReviewPopup></ReviewPopup>}
      {showSafariGuide && <SafariGuide></SafariGuide>}
      <Home></Home>
      <Background></Background>
      <Music></Music>
      <Ambient></Ambient>
    </>
  );
}

export default App;
