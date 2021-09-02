import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { storageRef } from '../../firebase/storage';

function AmbientAudio(props) {
  const ambientVolume = useSelector((store) => store.ambient.ambientVolume);

  const ambientRef = useRef();

  const [ambientURL, setAmbientURL] = useState();
  const currentAmbientFilePath = useRef();

  useEffect(() => {
    if (currentAmbientFilePath.current !== props.filePath) {
      if (props.url) {
        setAmbientURL(props.url);
        currentAmbientFilePath.current = props.filePath;
      } else {
        storageRef
          .child(props.filePath)
          .getDownloadURL()
          .then((url) => {
            setAmbientURL(url);
            currentAmbientFilePath.current = props.filePath;
          });
      }
    }

    ambientRef.current.volume = ambientVolume;
  }, [ambientVolume, props, currentAmbientFilePath]);

  return <audio src={ambientURL} preload="auto" loop={true} autoPlay={true} ref={ambientRef}></audio>;
}

export default AmbientAudio;
