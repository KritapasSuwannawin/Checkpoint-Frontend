import React from 'react';
import './Header.scss';
import checkpoint_logo from './images/Dark Checkpoint logo with text.png';
import buy_premium from './images/Buy Premium Button.svg';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <img width="120px" height="auto" className="img-responsive" src={checkpoint_logo} alt="logo" />
          </div>
          <ul className="menu">
            {/* <li className='menu-link'>
                        <a href="#">EN</a>
                    </li> */}
            <li className="menu-link">
              <a href="https://bit.ly/3Kx8XLs" target="_blank" rel="noreferrer">
                {' '}
                <img src={buy_premium} width="100px" alt=""></img>
              </a>
            </li>
          </ul>
          <div className="mobile-menu"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
