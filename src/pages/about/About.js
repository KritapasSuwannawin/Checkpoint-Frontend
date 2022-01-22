import './About.scss';

import aboutUsLanding from './aboutus-landing.png';
import fb from './facebook.png';
import ig from './instagram.png';
import yt from './youtube.png';
import tw from './twitter.png';

function About(props) {
  return (
    <div className="about">
      <div className="section first">
        <img className="landing-img" src={aboutUsLanding} alt=""></img>
        <div className="landing-content">
          <p className="landing-content__title">About Us</p>
          <p className="landing-content__sub-title">
            Hey there!<br></br>
            <br></br>
            Thank you very much for checking out this page! Since you clicked this page, I assume that you probably want
            to know more about Checkpoint. If so, you have come to the right place!
          </p>
        </div>
        <div className="landing-links">
          <a href="https://twitter.com/CheckpointTokyo" target="_blank" rel="noreferrer">
            <img src={tw} alt=""></img>
          </a>
          <a href="https://www.facebook.com/Checkpoint.tokyo" target="_blank" rel="noreferrer">
            <img src={fb} alt=""></img>
          </a>
          <a href="https://www.instagram.com/checkpoint.tokyo/" target="_blank" rel="noreferrer">
            <img src={ig} alt=""></img>
          </a>
          <a href="https://www.youtube.com/channel/UCyBC6LyIUwznEpO6pRt9pEg" target="_blank" rel="noreferrer">
            <img src={yt} alt=""></img>
          </a>
        </div>
      </div>
      <div className="section">
        <div className="section__content">
          <p className="section__content--title">What exactly is Checkpoint?</p>
          <p className="section__content--text">
            Basically, Checkpoint is a streaming platform which offers fully-customizable relaxing music, realistic
            ambience, and peaceful arts.
          </p>
        </div>
        <div className="section__content">
          <p className="section__content--title">Origin of this project</p>
          <p className="section__content--text">
            This project originated from the co-founders’ difficulties of living in a city. We felt that there is a high
            level of stress in an urban area.<br></br>
            <br></br>
            After asking people around us and doing some research, we found that many people living in a metropolis
            experience one thing in common: stress as a result of living in a closed-environment.<br></br>
            <br></br>
            Now that we think about it, this actually makes a lot of sense since one of the characteristics of a city is
            its small living area.<br></br>
            <br></br>
            We then discussed the issue to find an appropriate solution which is why Checkpoint is here! We certainly
            believe that relaxing music combined with realistic ambience and peaceful visual arts can make people feel
            more relaxed in such a closed-environment.
          </p>
        </div>
        <div className="section__content">
          <p className="section__content--title">Concepts</p>
          <p className="section__content--text">
            The major roles of our music and peaceful visual arts are to make you feel relaxed while realistic ambience
            would make you feel like you are in the middle of a particular environment.<br></br>
            <br></br>
            To illustrate, if you choose “river” ambience, we want you to feel as if you are at the river (though in
            reality you might be working in front of a computer). Likewise, if you select “rain” ambience, we want you
            to feel like it is raining at your place (though in reality it might be sunny outside). These sounds, in our
            opinion, can enhance your relaxing experience on our platform.<br></br>
            <br></br>
            Don’t you think that natural sounds such as rain, river, or birds are soothing to listen to?
          </p>
        </div>
        <div className="section__content">
          <p className="section__content--title">Epilogue</p>
          <p className="section__content--text">
            Thank you very much for reading until the end! I hope that you have learned a lot more about Checkpoint!
            <br></br>
            <br></br>
            If there is anything you would like to tell us or if you are a business or an artist looking to work with
            us, you can contact us at:<br></br>
            <br></br>
            inquiry@checkpoint.tokyo
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
