import { useState } from 'react';

import SliderCard from './SliderCard';

import './Tutorial.scss';

import logo from '../../svg/Tutorial/Checkpoint with text.svg';

function Tutorial(props) {
  const [page, setPage] = useState(0);

  const title = [
    'Welcome to Checkpoint.tokyo!',
    'Design Your Own Place to Relax With Interactive Background',
    'Design Your Own Environment With Customizable Ambience',
    'Design Your Own Favorite Playlist',
  ];
  const content = [
    'Let us show you how to design your own ways to relax at Checkpoint.tokyo',
    'Select the background that you love and customize the time and weather to your liking',
    'Add, remove, and adjust the ambience volume to match your desired mood',
    'Give a heart to your most-liked music to bring it to favorite playlist',
  ];

  function changePageHandler() {
    setPage(this);
  }

  function nextPageHandler() {
    setPage((page) => page + 1);
  }

  return (
    <div className="tutorial">
      <div className="tutorial__container">
        <img className="tutorial__container--logo" src={logo} alt=""></img>
        <SliderCard page={page} changePageHandler={changePageHandler}></SliderCard>
        <p className="tutorial__container--title">{title[page]}</p>
        <p className="tutorial__container--content">{content[page]}</p>
        <div className="tutorial__container--btn" onClick={page !== 3 ? nextPageHandler : props.closeHandler}>
          {page === 0 ? '3-Step Tutorial' : page !== 3 ? 'Next' : 'Done'}
        </div>
        {page !== 3 && (
          <p className="tutorial__container--later" onClick={props.closeHandler}>
            Later
          </p>
        )}
      </div>
    </div>
  );
}

export default Tutorial;
