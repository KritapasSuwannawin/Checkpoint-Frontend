import { useEffect, useRef, useState } from 'react';
import './Timer.scss';

import alarmStudyEnd from './audio/Clock alarm ending study session.wav';
import alarmBreakEnd from './audio/Clock alarm ending break session.wav';

import resetSvg from '../../svg/20px/Reset.svg';
import notiSvg from '../../svg/20px/Noti.svg';

function Timer(props) {
  const [mainTimerRunning, setMainTimerRunning] = useState(false);
  const [secondaryTimerRunning, setSecondaryTimerRunning] = useState(false);

  const [mainTimer, setMainTimer] = useState(1800);
  const [secondaryTimer, setSecondaryTimer] = useState(1800);

  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isBegun, setIsBegun] = useState(false);

  const [audioUrl, setAudioUrl] = useState();
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef();

  const studyInputRef = useRef();
  const shortBreakInputRef = useRef();
  const longBreakInputRef = useRef();

  function secondToMinute(timer) {
    const minute = Math.floor(timer / 60);
    const second = timer % 60;
    return `${minute}:${second > 9 ? second : `0${second}`}`;
  }

  function keyDownHandler(event) {
    if (this === 'main') {
      if (!'0123456789Backspace'.includes(event.key) || mainTimerRunning) {
        event.preventDefault();
      }
    } else if (this === 'secondary') {
      if (!'0123456789Backspace'.includes(event.key) || secondaryTimerRunning) {
        event.preventDefault();
      }
    }
  }

  function focusOutHandler(event) {
    if (this.ref.current.value === '') {
      this.ref.current.value = 0;
    }

    if (this.ref.current.value < this.min) {
      this.ref.current.value = this.min;
    }

    if (!mainTimerRunning && !isShortBreak && this.ref === studyInputRef) {
      setMainTimer(Number(studyInputRef.current.value) * 60);
    }

    if (!mainTimerRunning && isShortBreak && this.ref === shortBreakInputRef) {
      setMainTimer(Number(shortBreakInputRef.current.value) * 60);
    }

    if (!secondaryTimerRunning && this.ref === longBreakInputRef) {
      setSecondaryTimer(Number(longBreakInputRef.current.value) * 60);
    }
  }

  function mainTimerToggleHabdler() {
    setIsBegun(true);

    setMainTimerRunning((current) => {
      const newValue = !current;

      if (newValue) {
        setSecondaryTimerRunning(false);
      }

      return newValue;
    });
  }

  function secondaryTimerToggleHabdler() {
    setSecondaryTimerRunning((current) => {
      const newValue = !current;

      if (newValue) {
        setMainTimerRunning(false);
      }

      return newValue;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainTimerRunning) {
        setMainTimer((mainTimer) => mainTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mainTimerRunning]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondaryTimerRunning) {
        setSecondaryTimer((secondaryTimer) => secondaryTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondaryTimerRunning]);

  useEffect(() => {
    if (mainTimer === 0) {
      setIsShortBreak((current) => {
        const newValue = !current;

        if (Number(shortBreakInputRef.current.value) === 0) {
          setAudioUrl(alarmStudyEnd);
          audioRef.current.play();
          setMainTimer(Number(studyInputRef.current.value) * 60);
          return false;
        }

        if (newValue) {
          setAudioUrl(alarmStudyEnd);
          audioRef.current.play();
          setMainTimer(Number(shortBreakInputRef.current.value) * 60);
        } else {
          setAudioUrl(alarmBreakEnd);
          audioRef.current.play();
          setMainTimer(Number(studyInputRef.current.value) * 60);
        }

        return newValue;
      });
    }

    if (secondaryTimer === 0) {
      setSecondaryTimerRunning(false);
      setSecondaryTimer(Number(longBreakInputRef.current.value) * 60);
      setAudioUrl(alarmBreakEnd);
      audioRef.current.play();
    }
  }, [mainTimer, secondaryTimer]);

  function resetMainTimerHandler() {
    setMainTimerRunning(false);
    setMainTimer(Number(studyInputRef.current.value) * 60);
    setIsBegun(false);
    setIsShortBreak(false);
  }

  function resetSecondaryTimerHandler() {
    setSecondaryTimerRunning(false);
    setSecondaryTimer(Number(longBreakInputRef.current.value) * 60);
  }

  function audioMutedToggleHandler() {
    setIsAudioMuted((current) => !current);
  }

  return (
    <div className={`timer ${!props.showTimer ? 'hide' : ''}`}>
      <div className="close-btn" onClick={props.closeHandler}></div>
      <audio src={audioUrl} preload="auto" autoPlay={true} muted={isAudioMuted} ref={audioRef}></audio>
      <p className="heading">{!isBegun ? 'Pomodoro' : !isShortBreak ? 'Study/Work' : 'Short Break'}</p>
      <p className="main-timer">{secondToMinute(mainTimer)}</p>
      <div className="btn-container">
        <img src={notiSvg} className={`icon ${isAudioMuted ? 'light' : ''}`} alt="" onClick={audioMutedToggleHandler}></img>
        <div className={`start-btn ${mainTimerRunning ? 'pause' : ''}`} onClick={mainTimerToggleHabdler}>
          {!mainTimerRunning ? 'Start' : 'Pause'}
        </div>
        <img src={resetSvg} className="icon" alt="" onClick={resetMainTimerHandler}></img>
      </div>
      <div className="input-container">
        <div className="input-container__left">
          <p className="heading">Study/Work</p>
          <input
            className="input"
            type="number"
            defaultValue={30}
            ref={studyInputRef}
            onKeyDown={keyDownHandler.bind('main')}
            onBlur={focusOutHandler.bind({ min: 5, ref: studyInputRef })}
          ></input>
        </div>
        <div className="input-container__right">
          <p className="heading">Short Break</p>
          <input
            className="input"
            type="number"
            defaultValue={5}
            ref={shortBreakInputRef}
            onKeyDown={keyDownHandler.bind('main')}
            onBlur={focusOutHandler.bind({ min: 0, ref: shortBreakInputRef })}
          ></input>
        </div>
      </div>
      <p className="heading long-break">Long Break</p>
      <div className="btn-container">
        <p className="secondary-timer">{secondToMinute(secondaryTimer)}</p>
        <div className={`start-btn ${secondaryTimerRunning ? 'pause' : ''}`} onClick={secondaryTimerToggleHabdler}>
          {!secondaryTimerRunning ? 'Start' : 'Pause'}
        </div>
        <img src={resetSvg} className="icon" alt="" onClick={resetSecondaryTimerHandler}></img>
      </div>
      <input
        className="input margin-top"
        type="number"
        defaultValue={30}
        ref={longBreakInputRef}
        onKeyDown={keyDownHandler.bind('secondary')}
        onBlur={focusOutHandler.bind({ min: 5, ref: longBreakInputRef })}
      ></input>
    </div>
  );
}

export default Timer;
