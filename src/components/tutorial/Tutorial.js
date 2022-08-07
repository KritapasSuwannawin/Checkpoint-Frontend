import { useState } from 'react';
import { useSelector } from 'react-redux';

import SliderCard from './SliderCard';

import './Tutorial.scss';

import logo50 from '../../svg/50px/Checkpoint with text 50px.svg';
import buyPremiumBtn from '../../svg/50px/Buy Premium Button.svg';
import buyPremiumBtnJP from '../../svg/50px/Buy Premium Button JP.svg';

function Tutorial(props) {
  const [page, setPage] = useState(0);
  const isJapanese = useSelector((store) => store.language.isJapanese);

  const title = [
    !isJapanese ? 'Welcome to Checkpoint.tokyo!' : '​​Checkpoint.tokyo へようこそ！',
    !isJapanese
      ? 'Design Your Own Place to Relax With Interactive Background'
      : 'インタラクティブな背景でリラックスできる自分だけの場所をデザインする',
    !isJapanese ? 'Design Your Own Environment With Customizable Ambience' : 'カスタマイズ可能なアンビエンスで自分好みの環境をデザインする',
    !isJapanese ? 'Design Your Own Favorite Playlist' : '自分だけのお気に入りプレイリストをデザイン する',
    !isJapanese ? 'More Customizability With Premium' : 'プレミアムでより多くのカスタマイズが可能',
  ];
  const content = [
    !isJapanese
      ? 'Let us show you how to design your own ways to relax at Checkpoint.tokyo'
      : 'Checkpoint.tokyoで自分なりのリラックス方法をデザインする方法をお教えします',
    !isJapanese
      ? 'Select the background that you love and customize the time and weather to your liking'
      : '好きな背景を選び、時間や天気もお好みでカスタマイズできます',
    !isJapanese
      ? 'Add, remove, and adjust the ambience volume to match your desired mood'
      : 'アンビエンスの追加、削除、音量調整により、お好みのムードを演出します',
    !isJapanese
      ? 'Give a heart to your most-liked music to bring it to favorite playlist'
      : '一番好きな曲にハートをつけて、お気に入りのプレイリストにすることができます',
    !isJapanese
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
            {page === 0 ? (!isJapanese ? '4-Step Tutorial' : '4ステップのチュートリアル') : !isJapanese ? 'Next' : '次へ'}
          </div>
        ) : (
          <img
            className="tutorial__container--buy-premium"
            src={!isJapanese ? buyPremiumBtn : buyPremiumBtnJP}
            onClick={props.showUpgradePopupHandler}
            alt=""
          ></img>
        )}
        <p className="tutorial__container--later" onClick={props.closeHandler}>
          {!isJapanese ? 'Later' : '後で読む'}
        </p>
      </div>
    </div>
  );
}

export default Tutorial;
