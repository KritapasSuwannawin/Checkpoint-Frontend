import React, { useState, useEffect } from 'react';

import './SliderCard.scss';

import img1 from './img/Tutorial Image Page 1.jpg';
import img2 from './img/Tutorial Image Page 2.jpg';
import img3 from './img/Tutorial Image Page 3.jpg';
import img4 from './img/Tutorial Image Page 4.jpg';
import img5 from './img/Tutorial Image Page 5.jpg';
const imageSrcArr = [img1, img2, img3, img4, img5];

function SliderCard(props) {
  const [imageArr, setImageArr] = useState([]);

  const imageUrl = imageSrcArr[props.page];

  useEffect(() => {
    setImageArr((imageArr) => {
      return [
        ...imageArr,
        <img key={props.page} src={imageUrl} alt="" className="slider-card-tutorial__slide--image"></img>,
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
  }, [props.page, imageUrl]);

  return (
    <div className="slider-card-tutorial">
      <div className="slider-card-tutorial__slide">
        {imageArr}
        <div className="slider-card-tutorial__slide--btn-container">
          {imageSrcArr.map((url, index) => (
            <label
              key={index}
              className={`slider-card-tutorial__slide--btn ${props.page === index ? 'selected' : ''}`}
              onClick={props.changePageHandler.bind(index)}
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
