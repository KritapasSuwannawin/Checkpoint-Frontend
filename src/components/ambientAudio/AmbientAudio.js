import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { storageRef } from '../../firebase/storage';

function AmbientAudio(props) {
  const ambientPlaying = useSelector((store) => store.ambient.ambientPlaying);
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const ambientRef = useRef();

  const [ambientURL, setAmbientURL] = useState();

  useEffect(() => {
    storageRef
      .child(props.filePath)
      .getDownloadURL()
      .then((url) => {
        setAmbientURL(url);
      });

    if (ambientPlaying) {
      ambientRef.current.play();
    } else {
      ambientRef.current.pause();
    }

    ambientRef.current.volume = ambientVolume;
  }, [ambientPlaying, ambientVolume, props.filePath]);

  return <audio src={ambientURL} preload="auto" loop={true} autoPlay={ambientPlaying} ref={ambientRef}></audio>;
}

export default AmbientAudio;
