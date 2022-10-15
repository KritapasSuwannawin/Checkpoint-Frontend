import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { AiFillHeart } from 'react-icons/ai';
import { IoIosMusicalNotes } from 'react-icons/io';

import './Banner.scss';

import Ambience_icon from './icons/Ambience_icon.svg';
import VirtualSpace from './icons/VirtualSpace.svg';
import EnvironmentIcon from './icons/Environment_icon.svg';
import RelaxingMusicIcon from './icons/RelaxingMusic_icon.svg';
import CheckpointIcon from './icons/checkpoint-icon.svg';
import checkpoint_logo_white from './icons/Checkpoint logo white.svg';

const RealPhone = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Realistic_Smartphone.jpg`;
const BetterSleep = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Better+Sleep.jpg`;
const FocusMore = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/More+Productive.jpg`;
const EffectiveRelax = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Powerful+Relax.jpg`;
const Ambience = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/ambience.jpg`;
const Mood = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/mood.jpg`;
const MusicImg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Music.jpg`;
const VirtualShowcase = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Virtual.jpg`;
const DesktopShowcase = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Desktop.jpg`;

const Usecase = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Usecase.png`;
const FeedbackImg = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/Community+Review+For+Mobile.png`;
const CheckpointApp = `${process.env.REACT_APP_CLOUD_STORAGE_URL}/others/180px+logo+Checkpoint.png`;

let bannerData = {
  title_1: 'Design',
  title_2: 'Your Relaxing',
  title_3: 'Virtual Space',
  desc: 'Your Best Ambient Music Website for Relax',
};

let contentData = {
  title: 'Ambience Sound',
  desc_2: 'to enhance your relaxing experience.',
};

function Banner() {
  return (
    <div className="banner-bg">
      <div className="container">
        <div className="banner-con">
          <div className="banner-text">
            <h1>{bannerData.title_1} </h1>
            <h1>{bannerData.title_2} </h1>
            <h1>{bannerData.title_3} </h1>
            <p>{bannerData.desc}</p>
            <div className="mobile-app-icon-right">
              <img src={CheckpointApp} alt=""></img>
            </div>
            <div className="sub-banner">
              <div className="sub-banner-container-top">
                <img src={DesktopShowcase} alt=""></img>
              </div>
              <br />
              <div className="sub-banner-container">
                <img src={BetterSleep} alt=""></img>
                <p>Better Sleep</p>
              </div>

              <div className="sub-banner-container">
                <img src={FocusMore} alt=""></img>
                <p>Focus More</p>
              </div>

              <div className="sub-banner-container">
                <img src={EffectiveRelax} alt=""></img>
                <p>Effective Relaxation</p>
              </div>
            </div>

            <div className="content">
              <section>
                <div className="center-icon">
                  <img src={Ambience_icon} width="50" height="50" alt=""></img>
                </div>
                <div className="text-center">
                  <h1>Ambient Sound</h1>
                  <p>
                    <strong> Add, Remove, </strong>and <strong>Adjust</strong> the ambience volume
                  </p>
                  <p>{contentData.desc_2}</p>
                  <div className="icon-desc">
                    <p>
                      {' '}
                      <AiFillHeart color="#F580EB" /> for more focus
                    </p>
                  </div>
                </div>
                <img src={Ambience} alt=""></img>
              </section>
            </div>

            <div className="content">
              <section>
                <div className="center-icon">
                  <img src={VirtualSpace} width="50" height="50" alt=""></img>
                </div>
                <div className="text-center">
                  <h1>Virtual Space</h1>
                  <p>
                    Change Your Screen to <strong> Peaceful Animated Background </strong>
                  </p>
                  <div className="icon-desc">
                    <p>
                      {' '}
                      <AiFillHeart color="#F580EB" /> to feel like you are in that place
                    </p>
                  </div>
                </div>
                <div className="mobile-showcase-image">
                  <img src={VirtualShowcase} alt=""></img>
                </div>
              </section>
            </div>

            <div className="content">
              <section>
                <div className="center-icon">
                  <img src={EnvironmentIcon} width="250" height="50" alt=""></img>
                </div>
                <div className="text-center">
                  <h1>Design Your Virtual Space</h1>
                  <p>
                    Night or Rain,<strong> You Decide </strong>
                  </p>
                  <div className="icon-desc">
                    <p>
                      {' '}
                      <AiFillHeart color="#F580EB" /> to match your mood
                    </p>
                  </div>
                </div>
                <div className="mobile-showcase-image-virtual-space">
                  <img src={Mood} alt=""></img>
                </div>
              </section>
            </div>

            <div className="content">
              <section>
                <div className="center-icon">
                  <img src={RelaxingMusicIcon} width="250" height="50" alt=""></img>
                </div>
                <div className="text-center">
                  <h1>Enjoy With Relaxing Music</h1>
                  <p>to Charge Your Energy</p>
                  <div className="icon-desc">
                    <p>
                      {' '}
                      <IoIosMusicalNotes color="#F580EB" /> for better sleep
                    </p>
                  </div>
                </div>
                <div className="mobile-showcase-image">
                  <img src={MusicImg} alt=""></img>
                </div>
              </section>
            </div>

            <div className="content">
              <section>
                <div className="center-icon"> </div>
                <div className="text-center">
                  <h1>Relax while working</h1>
                  <p>Available on Desktop</p>
                  <div className="icon-desc">
                    <p>
                      {' '}
                      <img src={CheckpointIcon} alt=""></img> checkpoint.tokyo
                    </p>
                  </div>
                </div>
                <div className="mobile-showcase-image">
                  <br />
                  <img src={Usecase} alt=""></img>
                </div>
              </section>
            </div>

            <div className="content">
              <section>
                <div className="center-icon-less-padding"> </div>

                <div className="mobile-showcase-image-feedback">
                  <div className="center-mobile-showcase-image">
                    <img src={FeedbackImg} alt=""></img>
                  </div>
                  <br />
                </div>
              </section>
            </div>
            <br />
            <br />
            <br />
            <br />

            <div className="banner-text">
              <h1>{bannerData.title_1} </h1>
              <h1>{bannerData.title_2} </h1>
              <h1>{bannerData.title_3} </h1>
              <p>{bannerData.desc}</p>
              <div className="mobile-app-icon-right">
                <img src={CheckpointApp} alt=""></img>
              </div>
              <img src={DesktopShowcase} alt=""></img>
            </div>
          </div>
          <br />
          <br />
          <div className="content">
            <section>
              <div className="center-mobile-app-section"> </div>

              <div className="mobile-showcase-image-footer">
                <div className="download-now">
                  <p>Join Now</p>
                </div>
                <div className="download-now-desc">
                  <p>Available on Desktop</p>
                </div>
                <div className="center-checkpoint-icon-desc">
                  <div className="icon-desc">
                    <p>
                      {' '}
                      <img src={CheckpointIcon} alt=""></img> checkpoint.tokyo
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="mobile-app-coming-soon">
                    <p>Mobile Application is Coming Soon</p>
                  </div>
                  <div className="mobile-showcase-image">
                    <img src={RealPhone} alt=""></img>
                  </div>
                </div>

                <br />
                <br />
                <br />
                <br />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="content">
        <section className="footer">
          <div className="center-mobile-app-section"> </div>

          <div className="mobile-showcase-image-footer">
            <div className="footer-desc">
              <br />
              <br />
              <a href="https://www.checkpoint.tokyo/about" target="_blank" rel="noreferrer">
                About Us
              </a>
            </div>

            <div className="footer-desc">
              <a href="https://www.checkpoint.tokyo/policy" target="_blank" rel="noreferrer">
                Policy
              </a>
            </div>

            <div className="footer-desc">
              <a href="mailto: inquiry@checkpoint.tokyo" target="_blank" rel="noreferrer">
                Partnership with us
              </a>
              <br />
            </div>
            <br />

            <div className="center-social-icon">
              <div className="social.icon">
                <a href="https://twitter.com/CheckpointTokyo" target="_blank" rel="noreferrer" className="twitter social">
                  <FontAwesomeIcon icon={faTwitter} size="1x" />
                </a>
                <a href="https://www.facebook.com/Checkpoint.tokyo" target="_blank" rel="noreferrer" className="facebook social">
                  <FontAwesomeIcon icon={faFacebookSquare} size="1x" />
                </a>
                <a href="https://www.instagram.com/checkpoint.tokyo/" target="_blank" rel="noreferrer" className="instagram social">
                  <FontAwesomeIcon icon={faInstagram} size="1x" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCyBC6LyIUwznEpO6pRt9pEg/featured"
                  target="_blank"
                  rel="noreferrer"
                  className="youtube social"
                >
                  <FontAwesomeIcon icon={faYoutube} size="1x" />
                </a>
              </div>
            </div>
            <div className="checkpoint-footer-logo-container">
              <div className="checkpoint-footer-logo">
                <br />
                <img src={checkpoint_logo_white} alt=""></img>
              </div>
              <div className="all-right-reserved">
                <p>© 2022 Checkpoint.tokyo. All Rights Reserved</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Banner;
