import './SafariGuide.scss';

const imageUrl = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Safari+minigame.png`;

function SafariGuide(props) {
  return (
    <div className="safari-guide">
      <div className="safari-guide__content">
        <p>For Safari users, please adjust the settings for the best experience!</p>
        <img src={imageUrl} alt=""></img>
        <div className="safari-guide__done" onClick={props.closeHandler}>
          Done
        </div>
      </div>
    </div>
  );
}

export default SafariGuide;
