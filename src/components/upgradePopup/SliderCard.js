import React, { useState, useEffect } from 'react';

import './SliderCard.scss';

const img1 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+1.jpg`;
const img2 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+2.jpg`;
const img3 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+3.jpg`;
const img4 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+4.jpg`;
const img5 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+5.jpg`;
const img6 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+6.jpg`;
const img7 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+7.jpg`;
const img8 = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Upgrade+Image+Showcase+8.jpg`;
const imageSrcArr = [img1, img2, img3, img4, img5, img6, img7, img8];

function SliderCard(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageArr, setImageArr] = useState([]);

  const imageUrl = imageSrcArr[imageIndex];

  useEffect(() => {
    setImageArr((imageArr) => {
      return [
        ...imageArr,
        <img key={imageIndex} src={imageUrl} onClick={imageClickHandler} alt="" className="slider-card-upgrade__slide--image"></img>,
      ];
    });

    const timeout = setTimeout(() => {
      setImageArr((imageArr) => {
        if (imageArr.slice(-1).length === 1) {
          return imageArr.slice(-1);
        }
        return imageArr;
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [imageIndex, imageUrl]);

  function radioBtnClickHandler() {
    setImageIndex(this);
  }

  function imageClickHandler() {
    setImageIndex((index) => {
      if (index === imageSrcArr.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  }

  return (
    <div className="slider-card-upgrade">
      <div className="slider-card-upgrade__slide">
        {imageArr}
        <div className="slider-card-upgrade__slide--btn-container">
          {imageSrcArr.map((url, index) => (
            <label
              key={index}
              className={`slider-card-upgrade__slide--btn ${imageIndex === index ? 'selected' : ''}`}
              onClick={radioBtnClickHandler.bind(index)}
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
