import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import crypto from 'crypto-js';

import './LoginPopup.scss';

import { memberActions } from '../../store/memberSlice';
import { backgroundActions } from '../../store/backgroundSlice';
import { musicActions } from '../../store/musicSlice';
import { avatarActions } from '../../store/avatarSlice';

function LoginPopup(props) {
  const dispatch = useDispatch();

  const [signingUp, setSigningUp] = useState(props.signIn ? false : true);
  const [verificationCode, setVerificationCode] = useState(undefined);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [errorDuringAuthen, setErrorDuringAuthen] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [accountNotExist, setAccountNotExist] = useState(false);
  const [accountAlreadyExist, setAccountAlreadyExist] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(undefined);
  const [invalidCode, setInvalidCode] = useState(false);

  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [receiveNews, setReceiveNews] = useState(undefined);

  const emailRef = useRef();
  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const checkboxRef1 = useRef();
  const checkboxRef2 = useRef();
  const verificationCodeRef = useRef();

  function signUpSubmitHandler() {
    if (loading || !emailRef.current || !passwordRef1.current || !passwordRef2.current || !checkboxRef1.current) {
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef1.current.value;
    const confirmPassword = passwordRef2.current.value;

    const invalidEmail = !email.includes('@');
    const invalidPassword = password.length < 6;
    const passwordNotMatch = password !== confirmPassword;
    const agreeToPolicy = checkboxRef1.current.checked;

    if (invalidEmail) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }

    if (invalidPassword) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }

    if (passwordNotMatch) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }

    if (agreeToPolicy) {
      setAgreeToPolicy(true);
    } else {
      setAgreeToPolicy(false);
    }

    if (!invalidEmail && !invalidPassword && !passwordNotMatch && agreeToPolicy) {
      setLoading(true);
      const data = { email, loginMethod: 'email' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          const errorMessage = result.message;

          setErrorDuringAuthen(errorMessage === 'error during authentication');
          setAccountAlreadyExist(errorMessage === 'account already exist');

          if (!errorMessage) {
            emailRef.current.value = '';

            setEmail(email);
            setPassword(password);
            setReceiveNews(checkboxRef2.current.checked);
            setVerificationCode(result.verificationCode);
          }
        })
        .catch(() => {
          setErrorDuringAuthen(true);
        });
    }
  }

  function verifyHandler() {
    if (loading || !verificationCodeRef.current) {
      return;
    }

    if (
      verificationCodeRef.current.value ===
      crypto.AES.decrypt(verificationCode, process.env.REACT_APP_CHECKPOINT_SECURITY_KEY).toString(crypto.enc.Utf8)
    ) {
      setLoading(true);
      setInvalidCode(false);

      const data = { email, password, loginMethod: 'email', receiveNews };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          const errorMessage = result.message;

          setErrorDuringAuthen(errorMessage === 'error during authentication');
          setAccountAlreadyExist(errorMessage === 'account already exist');

          if (!errorMessage) {
            dispatch(memberActions.setMember(result.data[0]));
            document.removeEventListener('keyup', enterHandler);
            props.closeHandler(true);
          }
        })
        .catch(() => {
          setErrorDuringAuthen(true);
        });
    } else {
      setInvalidCode(true);
    }
  }

  function signInSubmitHandler() {
    if (loading || !emailRef.current || !passwordRef1.current) {
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef1.current.value;

    const invalidEmail = !email.includes('@');
    const invalidPassword = password.length < 6;

    if (invalidEmail) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }

    if (invalidPassword) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }

    if (!invalidEmail && !invalidPassword) {
      setLoading(true);
      const data = { email, password, loginMethod: 'email' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          const errorMessage = result.message;

          setErrorDuringAuthen(errorMessage === 'error during authentication');
          setIncorrectPassword(errorMessage === 'incorrect password');
          setAccountNotExist(errorMessage === 'account not exist');

          if (!errorMessage) {
            const data = result.data[0];
            dispatch(backgroundActions.changeBackgroundHandler(data.backgroundId));
            dispatch(musicActions.setInitialMusic(data.musicId));
            dispatch(musicActions.setMusicCategory(data.musicCategory));
            dispatch(musicActions.setFavouriteMusicIdArr(data.favouriteMusicIdArr));
            dispatch(musicActions.setPlayFromPlaylist(data.playFromPlaylist));
            dispatch(avatarActions.changeAvatarHandler(data.avatarId));
            dispatch(memberActions.setMember(data));
            document.removeEventListener('keyup', enterHandler);
            props.closeHandler(false);
          }
        })
        .catch(() => {
          setErrorDuringAuthen(true);
        });
    }
  }

  function signUpClickHandler() {
    setSigningUp(this);

    setInvalidEmail(false);
    setInvalidPassword(false);

    setPasswordNotMatch(false);
    setErrorDuringAuthen(false);
    setIncorrectPassword(false);
    setAccountNotExist(false);
    setAccountAlreadyExist(false);
    setAgreeToPolicy(undefined);
  }

  function enterHandler(event) {
    if (event.key === 'Enter') {
      if (verificationCode) {
        verifyHandler();
      } else if (!signingUp) {
        signInSubmitHandler();
      } else if (signingUp) {
        signUpSubmitHandler();
      }
    }
  }

  document.addEventListener('keyup', enterHandler);

  return (
    <div className="login-popup">
      <form>
        {!verificationCode ? (
          <>
            <div className="login-popup__title-container">
              {!props.signIn && (
                <p
                  className={`login-popup__title ${!signingUp ? 'not-current' : ''}`}
                  onClick={signUpClickHandler.bind(true)}
                >
                  Sign up
                </p>
              )}
              <p
                className={`login-popup__title ${signingUp ? 'not-current' : ''}`}
                onClick={signUpClickHandler.bind(false)}
              >
                Sign in
              </p>
            </div>
            <input className="login-popup__input" type="text" placeholder="Email" id="email" ref={emailRef}></input>
            {invalidEmail && <p className="login-popup__error-msg">Invalid email</p>}
            <input className="login-popup__input" type="password" placeholder="Password" ref={passwordRef1}></input>
            {invalidPassword && <p className="login-popup__error-msg">Password must contain at least 6 characters</p>}
            {!signingUp && (
              <>
                {incorrectPassword && <p className="login-popup__error-msg">Incorect password</p>}
                {accountNotExist && (
                  <p className="login-popup__error-msg">Account does not exist, please sign up first</p>
                )}
              </>
            )}
            {signingUp && (
              <>
                <input
                  className="login-popup__input"
                  type="password"
                  placeholder="Confirm password"
                  ref={passwordRef2}
                ></input>
                {passwordNotMatch && <p className="login-popup__error-msg">Passwords do not match</p>}
                {accountAlreadyExist && (
                  <p className="login-popup__error-msg">Account already exists, please sign in</p>
                )}
                <div className="login-popup__privacy-container margin-top">
                  <input type="checkbox" ref={checkboxRef1}></input>
                  <p>
                    By registering, you agree to the{' '}
                    <a
                      href={`${window.location.href.replace('premium', '')}term-condition`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms
                    </a>{' '}
                    and{' '}
                    <a
                      href={`${window.location.href.replace('premium', '')}term-condition`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                <div className="login-popup__privacy-container">
                  <input type="checkbox" ref={checkboxRef2}></input>
                  <p>I agree to receive news and updates from Checkpoint.</p>
                </div>
              </>
            )}
            <div className="login-popup__submit-btn" onClick={signingUp ? signUpSubmitHandler : signInSubmitHandler}>
              {signingUp ? 'Sign up' : 'Sign in'}
            </div>
            {signingUp && agreeToPolicy === false && (
              <p className="login-popup__error-msg">Please agree to the policy</p>
            )}
            {errorDuringAuthen && <p className="login-popup__error-msg">Error occured, please try again later</p>}
          </>
        ) : (
          <>
            <p className={`login-popup__title`}>Email Verification</p>
            <input
              className="login-popup__input"
              type="text"
              ref={verificationCodeRef}
              placeholder="Verification code (check your email)"
            ></input>
            {accountAlreadyExist && <p className="login-popup__error-msg">Account already exists, please sign in</p>}
            {invalidCode && <p className="login-popup__error-msg">Invalid verification code</p>}
            <div className="login-popup__submit-btn no-margin" onClick={verifyHandler}>
              Verify
            </div>
            {errorDuringAuthen && <p className="login-popup__error-msg">Error occured, please try again later</p>}
          </>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
