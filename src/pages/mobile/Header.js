import './Header.scss';

const checkpoint_logo = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Dark+Checkpoint+logo+with+text.png`;

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <img width="120px" height="auto" className="img-responsive" src={checkpoint_logo} alt="logo" />
          </div>
          <div className="mobile-menu"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
