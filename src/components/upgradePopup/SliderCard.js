import React, { useState, useEffect } from 'react';

import './SliderCard.scss';

import img1 from './img/Upgrade Image Showcase 1.png';
import img2 from './img/Upgrade Image Showcase 2.png';
import img3 from './img/Upgrade Image Showcase 3.png';
import img4 from './img/Upgrade Image Showcase 4.png';
import img5 from './img/Upgrade Image Showcase 5.png';
import img6 from './img/Upgrade Image Showcase 6.png';
import img7 from './img/Upgrade Image Showcase 7.png';
import img8 from './img/Upgrade Image Showcase 8.png';
const imageSrcArr = [img1, img2, img3, img4, img5, img6, img7, img8];

function SliderCard(props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageArr, setImageArr] = useState([]);

  const imageUrl = imageSrcArr[imageIndex];

  useEffect(() => {
    setImageArr((imageArr) => {
      return [...imageArr, <img key={imageIndex} src={imageUrl} alt="" className="slider-card__slide--image"></img>];
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

  return (
    <div className="slider-card">
      <div className="slider-card__slide">
        {imageArr}
        <div className="slider-card__slide--btn-container">
          {imageSrcArr.map((url, index) => (
            <label
              key={index}
              className={`slider-card__slide--btn ${imageIndex === index ? 'selected' : ''}`}
              onClick={radioBtnClickHandler.bind(index)}
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
