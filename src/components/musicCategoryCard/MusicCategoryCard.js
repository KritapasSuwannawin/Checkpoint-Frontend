import './MusicCategoryCard.scss';

function MusicCategoryCard(props) {
  const dataArr = props.dataArr;

  return (
    <div className="music-category-card">
      <div className="music-category-card__title">
        <p className="music-category-card__title--text">{props.category}</p>
        <div className="music-category-card__title--btn">See All</div>
      </div>
      <div className="music-category-card__content">
        <img src={dataArr[0].thumbnailUrl} alt="" className="music-category-card__content--main-thumbnail"></img>
        <div>
          <div className="music-category-card__content--sub-thumbnail-container">
            <img src={dataArr[1].thumbnailUrl} alt=""></img>
            <img src={dataArr[2].thumbnailUrl} alt=""></img>
          </div>
          <div className="music-category-card__content--sub-thumbnail-container margin-top">
            <img src={dataArr[3].thumbnailUrl} alt=""></img>
            <img src={dataArr[4].thumbnailUrl} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicCategoryCard;
