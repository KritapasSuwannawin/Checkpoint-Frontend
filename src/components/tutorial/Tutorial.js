import { useState } from 'react';
import { useSelector } from 'react-redux';

import SliderCard from './SliderCard';

import './Tutorial.scss';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import buyPremiumBtnJP from '../../svg/50px/Buy Premium Button JP.svg';

function Tutorial(props) {
  const [page, setPage] = useState(0);
  const languageIndex = useSelector((store) => store.language.languageIndex);

  const title = [
    languageIndex === 0 ? 'Welcome to Checkpoint.tokyo!' : '​​Checkpoint.tokyo へようこそ！',
    languageIndex === 0
      ? 'Design Your Own Place to Relax With Interactive Background'
      : 'インタラクティブな背景でリラックスできる自分だけの場所をデザインする',
    languageIndex === 0
      ? 'Design Your Own Environment With Customizable Ambience'
      : 'カスタマイズ可能なアンビエンスで自分好みの環境をデザインする',
    languageIndex === 0 ? 'Design Your Own Favorite Playlist' : '自分だけのお気に入りプレイリストをデザイン する',
    languageIndex === 0 ? 'More Customizability With Premium' : 'プレミアムでより多くのカスタマイズが可能',
  ];
  const content = [
    languageIndex === 0
      ? 'Let us show you how to design your own ways to relax at Checkpoint.tokyo'
      : 'Checkpoint.tokyoで自分なりのリラックス方法をデザインする方法をお教えします',
    languageIndex === 0
      ? 'Select the background that you love and customize the time and weather to your liking'
      : '好きな背景を選び、時間や天気もお好みでカスタマイズできます',
    languageIndex === 0
      ? 'Add, remove, and adjust the ambience volume to match your desired mood'
      : 'アンビエンスの追加、削除、音量調整により、お好みのムードを演出します',
    languageIndex === 0
      ? 'Give a heart to your most-liked music to bring it to favorite playlist'
      : '一番好きな曲にハートをつけて、お気に入りのプレイリストにすることができます',
    languageIndex === 0
      ? "Redeem a code that's sent to your email to activate Premium in Checkpoint.tokyo"
      : 'Checkpoint.tokyoでプレミアムを有効にするためのコードがメールで送信されるので、それを利用する',
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
        <img className="tutorial__container--logo" src={logo50} alt=""></img>
        <SliderCard page={page} changePageHandler={changePageHandler}></SliderCard>
        <p className="tutorial__container--title">{title[page]}</p>
        <p className="tutorial__container--content">{content[page]}</p>
        {page !== 4 ? (
          <div className="tutorial__container--btn" onClick={nextPageHandler}>
            {page === 0 ? (languageIndex === 0 ? '4-Step Tutorial' : '4ステップのチュートリアル') : languageIndex === 0 ? 'Next' : '次へ'}
          </div>
        ) : (
          <img
            className="tutorial__container--buy-premium"
            src={languageIndex === 0 ? buyPremiumBtn : buyPremiumBtnJP}
            onClick={props.openUpgradePopupHandler}
            alt=""
          ></img>
        )}
        <p className="tutorial__container--later" onClick={props.closeHandler}>
          {languageIndex === 0 ? 'Later' : '後で読む'}
        </p>
      </div>
    </div>
  );
}

export default Tutorial;
