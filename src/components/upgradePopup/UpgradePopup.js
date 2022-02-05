import './UpgradePopup.scss';

function UpgradePopup(props) {
  function closeHandler() {
    props.closeHandler();
  }

  return (
    <div className="upgrade-popup">
      <div className="upgrade-popup__container">
        <div className="upgrade-popup__close-btn" onClick={closeHandler}></div>
        <p className="upgrade-popup__title">Premium</p>
        <p className="upgrade-popup__content">
          {process.env.REACT_APP_SUBSCRIPTION_PRICE}$ <span>/mo</span>
        </p>
        <a href={process.env.REACT_APP_UPGRADE_LINK} target="_blank" rel="noreferrer" className="upgrade-popup__btn">
          Buy Premium
        </a>
      </div>
    </div>
  );
}

export default UpgradePopup;
