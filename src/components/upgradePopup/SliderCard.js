import React, { useState, useEffect } from 'react';

import './SliderCard.scss';

import img1 from './img/Upgrade Image Showcase 1.jpg';
import img2 from './img/Upgrade Image Showcase 2.jpg';
import img3 from './img/Upgrade Image Showcase 3.jpg';
import img4 from './img/Upgrade Image Showcase 4.jpg';
import img5 from './img/Upgrade Image Showcase 5.jpg';
import img6 from './img/Upgrade Image Showcase 6.jpg';
import img7 from './img/Upgrade Image Showcase 7.jpg';
import img8 from './img/Upgrade Image Showcase 8.jpg';
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
