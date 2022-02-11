import { useState } from 'react';

import SliderCard from './SliderCard';

import './Tutorial.scss';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import buyPremiumBtn from '../../svg/50px/buy-premium-button.png';

const title = [
  'Welcome to Checkpoint.tokyo!',
  'Design Your Own Place to Relax With Interactive Background',
  'Design Your Own Environment With Customizable Ambience',
  'Design Your Own Favorite Playlist',
  'More Customizability With Premium',
];
const content = [
  'Let us show you how to design your own ways to relax at Checkpoint.tokyo',
  'Select the background that you love and customize the time and weather to your liking',
  'Add, remove, and adjust the ambience volume to match your desired mood',
  'Give a heart to your most-liked music to bring it to favorite playlist',
  "Redeem a code that's sent to your email to activate Premium in Checkpoint.tokyo",
];

function Tutorial(props) {
  const [page, setPage] = useState(0);

  function changePageHandler() {
    setPage(this);
  }

  function nextPageHandler() {
    setPage((page) => page + 1);
  }

  return (
    <div className="tutorial">
      <div className="tutorial__container">
        <img className="tutorial__container--logo" src={logo50} alt=""></img>
        <SliderCard page={page} changePageHandler={changePageHandler}></SliderCard>
        <p className="tutorial__container--title">{title[page]}</p>
        <p className="tutorial__container--content">{content[page]}</p>
        {page !== 4 ? (
          <div className="tutorial__container--btn" onClick={nextPageHandler}>
            {page === 0 ? '4-Step Tutorial' : 'Next'}
          </div>
        ) : (
          <img
            className="tutorial__container--buy-premium"
            src={buyPremiumBtn}
            onClick={props.openUpgradePopupHandler}
            alt=""
          ></img>
        )}
        <p className="tutorial__container--later" onClick={props.closeHandler}>
          Later
        </p>
      </div>
    </div>
  );
}

export default Tutorial;
