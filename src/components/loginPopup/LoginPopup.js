import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopupHandler, googleProvider, appleProvider } from '../../firebase/app';
import crypto from 'crypto-js';

import './LoginPopup.scss';

import { memberActions } from '../../store/memberSlice';
import { backgroundActions } from '../../store/backgroundSlice';
import { musicActions } from '../../store/musicSlice';
import { avatarActions } from '../../store/avatarSlice';
import { deviceActions } from '../../store/deviceSlice';

import spinner from '../../svg/20px/spinner-solid.svg';
import googleLogo from '../../svg/36px/google-logo.svg';
import appleLogo from '../../svg/36px/apple-brands.svg';

function LoginPopup(props) {
  const languageIndex = useSelector((store) => store.language.languageIndex);

  const dispatch = useDispatch();

  const [signingUp, setSigningUp] = useState(props.signIn ? false : true);
  const [verificationCode, setVerificationCode] = useState(undefined);
  const [resetPasswordVerificationCode, setResetPasswordVerificationCode] = useState(undefined);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [invalidResetPasswordVerificationCode, setInvalidResetPasswordVerificationCode] = useState(false);
  const [allowEnterNewPassword, setAllowEnterNewPassword] = useState(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [errorDuringAuthen, setErrorDuringAuthen] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [accountNotExist, setAccountNotExist] = useState(false);
  const [accountAlreadyExist, setAccountAlreadyExist] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(undefined);
  const [invalidCode, setInvalidCode] = useState(false);
  const [newPasswordNotMatch, setNewPasswordNotMatch] = useState(false);
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);

  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [receiveNews, setReceiveNews] = useState(undefined);

  const emailRef = useRef();
  const passwordRef1 = useRef();
  const passwordRef2 = useRef();
  const checkboxRef1 = useRef();
  const checkboxRef2 = useRef();
  const verificationCodeRef = useRef();
  const resetPasswordEmailRef = useRef();
  const resetPasswordVerificationCodeRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  if (
    localStorage.getItem('CheckpointEmail') &&
    localStorage.getItem('CheckpointPassword') &&
    localStorage.getItem('CheckpointLoginMethod')
  ) {
    const data = {
      email: localStorage.getItem('CheckpointEmail'),
      password: localStorage.getItem('CheckpointPassword'),
      loginMethod: localStorage.getItem('CheckpointLoginMethod'),
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        const errorMessage = result.message;

        setErrorDuringAuthen(errorMessage === 'error during authentication');
        setIncorrectPassword(errorMessage === 'incorrect password');
        setAccountNotExist(errorMessage === 'account not exist');

        if (!errorMessage) {
          const data = result.data[0];
          dispatch(deviceActions.setNewDevice());
          dispatch(backgroundActions.changeBackgroundHandler(data.backgroundId));
          dispatch(musicActions.setInitialMusic(data.musicId));
          dispatch(musicActions.setMusicCategory(data.musicCategory));
          dispatch(musicActions.setFavouriteMusicIdArr(data.favouriteMusicIdArr));
          dispatch(musicActions.setPlayFromPlaylist(data.playFromPlaylist));
          dispatch(avatarActions.changeAvatarHandler(data.avatarId));
          dispatch(memberActions.setMember(data));
          setLocalStorage({
            email: localStorage.getItem('CheckpointEmail'),
            password: localStorage.getItem('CheckpointPassword'),
            loginMethod: localStorage.getItem('CheckpointLoginMethod'),
          });
          document.removeEventListener('keyup', enterHandler);
          props.closeHandler(false);
        } else {
          clearLocalStorage();
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorDuringAuthen(true);
      });
  }

  function setLocalStorage(data) {
    const { email, password, loginMethod } = data;
    localStorage.setItem('CheckpointEmail', email);
    localStorage.setItem('CheckpointPassword', password);
    localStorage.setItem('CheckpointLoginMethod', loginMethod);
  }

  function clearLocalStorage() {
    localStorage.removeItem('CheckpointEmail');
    localStorage.removeItem('CheckpointPassword');
    localStorage.removeItem('CheckpointLoginMethod');
  }

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
      setErrorDuringAuthen(false);
      setAccountAlreadyExist(false);

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
          setLoading(false);
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
      setErrorDuringAuthen(false);
      setAccountAlreadyExist(false);

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
            dispatch(deviceActions.setNewDevice());
            dispatch(memberActions.setMember(result.data[0]));
            setLocalStorage(data);
            document.removeEventListener('keyup', enterHandler);
            props.closeHandler(true);
          }
        })
        .catch(() => {
          setLoading(false);
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
      setErrorDuringAuthen(false);
      setIncorrectPassword(false);
      setAccountNotExist(false);

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
            dispatch(deviceActions.setNewDevice());
            dispatch(backgroundActions.changeBackgroundHandler(data.backgroundId));
            dispatch(musicActions.setInitialMusic(data.musicId));
            dispatch(musicActions.setMusicCategory(data.musicCategory));
            dispatch(musicActions.setFavouriteMusicIdArr(data.favouriteMusicIdArr));
            dispatch(musicActions.setPlayFromPlaylist(data.playFromPlaylist));
            dispatch(avatarActions.changeAvatarHandler(data.avatarId));
            dispatch(memberActions.setMember(data));
            setLocalStorage({ email, password, loginMethod: 'email' });
            document.removeEventListener('keyup', enterHandler);
            props.closeHandler(false);
          } else {
            clearLocalStorage();
          }
        })
        .catch(() => {
          setLoading(false);
          setErrorDuringAuthen(true);
        });
    }
  }

  function signUpClickHandler() {
    setSigningUp(this);

    setInvalidEmail(false);
    setInvalidPassword(false);
    setForgetPassword(false);

    setPasswordNotMatch(false);
    setErrorDuringAuthen(false);
    setIncorrectPassword(false);
    setAccountNotExist(false);
    setAccountAlreadyExist(false);
    setAgreeToPolicy(undefined);
  }

  function enterHandler(event) {
    if (event.key === 'Enter' && !forgetPassword) {
      if (verificationCode) {
        verifyHandler();
      } else if (!signingUp) {
        signInSubmitHandler();
      } else if (signingUp) {
        signUpSubmitHandler();
      }
    }
  }

  function forgetPasswordHandler() {
    setForgetPassword(true);
    setInvalidEmail(false);
    setInvalidPassword(false);
  }

  function forgetPasswordEmailSendHandler() {
    if (loading) {
      return;
    }

    const email = resetPasswordEmailRef.current.value;

    if (email.includes('@')) {
      setEmail(email);
      setInvalidEmail(false);
      setLoading(true);
      setErrorDuringAuthen(false);
      setAccountNotExist(false);

      const data = { email };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/forget-password`, {
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
          setAccountNotExist(errorMessage === 'account not exist');

          if (!errorMessage) {
            resetPasswordEmailRef.current.value = '';
            setResetPasswordVerificationCode(result.verificationCode);
          }
        })
        .catch(() => {
          setLoading(false);
          setErrorDuringAuthen(true);
        });
    } else {
      setInvalidEmail(true);
    }
  }

  function forgetPasswordCheckCodeHandler() {
    if (
      resetPasswordVerificationCodeRef.current.value ===
      crypto.AES.decrypt(resetPasswordVerificationCode, process.env.REACT_APP_CHECKPOINT_SECURITY_KEY).toString(
        crypto.enc.Utf8
      )
    ) {
      setInvalidResetPasswordVerificationCode(false);
      setAllowEnterNewPassword(true);
    } else {
      setInvalidResetPasswordVerificationCode(true);
    }
  }

  function resetPasswordHandler() {
    if (loading) {
      return;
    }

    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;

    if (newPassword !== confirmNewPassword) {
      setNewPasswordNotMatch(true);
      return;
    } else {
      setNewPasswordNotMatch(false);
    }

    if (newPassword.length < 6) {
      setInvalidNewPassword(true);
      return;
    } else {
      setInvalidNewPassword(false);
    }

    setLoading(true);
    setErrorDuringAuthen(false);

    const data = { email, newPassword };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/reset-password`, {
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

        if (!errorMessage) {
          clearLocalStorage();
          setForgetPassword(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorDuringAuthen(true);
      });
  }

  function loginHandler() {
    let provider;
    if (this === 'google') {
      provider = googleProvider;
    } else if (this === 'apple') {
      provider = appleProvider;
    }

    signInWithPopupHandler(provider)
      .then((result) => {
        const { email, uid } = result.user.providerData[0];

        if (signingUp) {
          if (!checkboxRef1.current.checked) {
            setAgreeToPolicy(false);
            return;
          } else {
            setAgreeToPolicy(true);
          }

          setLoading(true);
          setErrorDuringAuthen(false);
          setAccountAlreadyExist(false);

          const data = { email, password: uid, loginMethod: this, receiveNews: checkboxRef2.current.checked };

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
                dispatch(deviceActions.setNewDevice());
                dispatch(memberActions.setMember(result.data[0]));
                setLocalStorage(data);
                document.removeEventListener('keyup', enterHandler);
                props.closeHandler(true);
              }
            })
            .catch(() => {
              setLoading(false);
              setErrorDuringAuthen(true);
            });
        } else {
          setLoading(true);
          setErrorDuringAuthen(false);
          setIncorrectPassword(false);
          setAccountNotExist(false);

          const data = { email, password: uid, loginMethod: this };

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
                dispatch(deviceActions.setNewDevice());
                dispatch(backgroundActions.changeBackgroundHandler(data.backgroundId));
                dispatch(musicActions.setInitialMusic(data.musicId));
                dispatch(musicActions.setMusicCategory(data.musicCategory));
                dispatch(musicActions.setFavouriteMusicIdArr(data.favouriteMusicIdArr));
                dispatch(musicActions.setPlayFromPlaylist(data.playFromPlaylist));
                dispatch(avatarActions.changeAvatarHandler(data.avatarId));
                dispatch(memberActions.setMember(data));
                setLocalStorage({ email, password: uid, loginMethod: this });
                document.removeEventListener('keyup', enterHandler);
                props.closeHandler(false);
              } else {
                clearLocalStorage();
              }
            })
            .catch(() => {
              setLoading(false);
              setErrorDuringAuthen(true);
            });
        }
      })
      .catch(() => setErrorDuringAuthen(true));
  }

  document.addEventListener('keyup', enterHandler);

  if (forgetPassword) {
    return (
      <div className="login-popup">
        <div className="login-popup__form">
          <div className="login-popup__title-container">
            {!props.signIn && (
              <p
                className={`login-popup__title ${!signingUp ? 'not-current' : ''} ${
                  languageIndex !== 0 ? 'small' : ''
                }`}
                onClick={signUpClickHandler.bind(true)}
              >
                {languageIndex === 0 ? 'Sign up' : 'サインアップ'}
              </p>
            )}
            <p
              className={`login-popup__title ${signingUp ? 'not-current' : ''} ${languageIndex !== 0 ? 'small' : ''}`}
              onClick={signUpClickHandler.bind(false)}
            >
              {languageIndex === 0 ? 'Sign in' : 'サインイン'}
            </p>
          </div>
          <p className={`login-popup__sub-title`}>{languageIndex === 0 ? 'Reset Password' : 'パスワードの再設定'}</p>
          {!resetPasswordVerificationCode ? (
            <input
              className="login-popup__input"
              type="text"
              id="email"
              ref={resetPasswordEmailRef}
              placeholder={languageIndex === 0 ? 'Email' : 'メール'}
            ></input>
          ) : !allowEnterNewPassword ? (
            <input
              className="login-popup__input"
              type="text"
              ref={resetPasswordVerificationCodeRef}
              placeholder={
                languageIndex === 0 ? 'Verification code (check your email)' : '検証コード（メールを確認してください）'
              }
            ></input>
          ) : (
            <>
              <input
                className="login-popup__input"
                type="password"
                ref={newPasswordRef}
                placeholder={languageIndex === 0 ? 'New Password' : '新しいパスワード'}
              ></input>
              <input
                className="login-popup__input"
                type="password"
                ref={confirmNewPasswordRef}
                placeholder={languageIndex === 0 ? 'Confirm new password' : '新しいパスワードの確認'}
              ></input>
            </>
          )}
          {invalidEmail && (
            <p className="login-popup__error-msg">{languageIndex === 0 ? 'Invalid email' : '無効なメール'}</p>
          )}
          {newPasswordNotMatch && (
            <p className="login-popup__error-msg">
              {languageIndex === 0 ? 'Passwords do not match' : 'パスワードが一致していません'}
            </p>
          )}
          {invalidNewPassword && (
            <p className="login-popup__error-msg">
              {languageIndex === 0
                ? 'Password must contain at least 6 characters'
                : '>パスワードには6文字以上が含まれている必要があります'}
            </p>
          )}
          {languageIndex === 0 ? (
            <p className="login-popup__contact">
              If you need any help, please contact <br></br>
              <span>inquiry@checkpoint.tokyo</span>
            </p>
          ) : (
            <p className="login-popup__contact">
              何かお困りのことがありましたら、<br></br>
              <span>support@checkpoint.tokyo</span> までご連絡ください。
            </p>
          )}
          {!resetPasswordVerificationCode ? (
            <div className="login-popup__submit-btn no-margin" onClick={forgetPasswordEmailSendHandler}>
              {loading ? (
                <img className="login-popup__spinner" src={spinner} alt=""></img>
              ) : languageIndex === 0 ? (
                'Send'
              ) : (
                '送信'
              )}
            </div>
          ) : (
            <div
              className="login-popup__submit-btn no-margin"
              onClick={allowEnterNewPassword ? resetPasswordHandler : forgetPasswordCheckCodeHandler}
            >
              {loading ? (
                <img className="login-popup__spinner" src={spinner} alt=""></img>
              ) : languageIndex === 0 ? (
                'Submit'
              ) : (
                '送信'
              )}
            </div>
          )}
          {invalidResetPasswordVerificationCode && (
            <p className="login-popup__error-msg">
              {languageIndex === 0 ? 'Invalid verification code' : '無効な検証コード'}
            </p>
          )}
          {accountNotExist && (
            <p className="login-popup__error-msg">
              {languageIndex === 0
                ? 'Account does not exist, please sign up'
                : 'アカウントが存在しません。サインアップしてください'}
            </p>
          )}
          {errorDuringAuthen && (
            <p className="login-popup__error-msg">
              {languageIndex === 0
                ? 'Error occured, please try again later'
                : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-popup">
      <div className="login-popup__form">
        {!verificationCode ? (
          <>
            <div className="login-popup__title-container">
              {!props.signIn && (
                <p
                  className={`login-popup__title ${!signingUp ? 'not-current' : ''} ${
                    languageIndex !== 0 ? 'small' : ''
                  }`}
                  onClick={signUpClickHandler.bind(true)}
                >
                  {languageIndex === 0 ? 'Sign up' : 'サインアップ'}
                </p>
              )}
              <p
                className={`login-popup__title ${signingUp ? 'not-current' : ''} ${languageIndex !== 0 ? 'small' : ''}`}
                onClick={signUpClickHandler.bind(false)}
              >
                {languageIndex === 0 ? 'Sign in' : 'サインイン'}
              </p>
            </div>
            <div>
              {signingUp
                ? languageIndex === 0
                  ? 'Sign up with'
                  : 'に登録する'
                : languageIndex === 0
                ? 'Sign in with'
                : 'でサインイン'}
            </div>
            <div className="login-popup__logo-container">
              <img src={googleLogo} alt="" className="small" onClick={loginHandler.bind('google')}></img>
              <img src={appleLogo} alt="" onClick={loginHandler.bind('apple')}></img>
            </div>
            <div className="login-popup__seperator"></div>
            <input
              className="login-popup__input"
              type="text"
              placeholder={languageIndex === 0 ? 'Email' : 'メール'}
              id="email"
              ref={emailRef}
            ></input>
            {invalidEmail && (
              <p className="login-popup__error-msg">{languageIndex === 0 ? 'Invalid email' : '無効なメール'}</p>
            )}
            <input
              className="login-popup__input"
              type="password"
              placeholder={languageIndex === 0 ? 'Password' : 'パスワード'}
              ref={passwordRef1}
            ></input>
            {invalidPassword && (
              <p className="login-popup__error-msg">
                {languageIndex === 0
                  ? 'Password must contain at least 6 characters'
                  : '>パスワードには6文字以上が含まれている必要があります'}
              </p>
            )}
            {!signingUp && (
              <>
                {incorrectPassword && (
                  <p className="login-popup__error-msg">
                    {languageIndex === 0 ? 'Incorect password' : '間違ったパスワード'}
                  </p>
                )}
                {accountNotExist && (
                  <p className="login-popup__error-msg">
                    {languageIndex === 0
                      ? 'Account does not exist, please sign up'
                      : 'アカウントが存在しません。サインアップしてください'}
                  </p>
                )}
              </>
            )}
            {signingUp && (
              <>
                <input
                  className="login-popup__input"
                  type="password"
                  placeholder={languageIndex === 0 ? 'Confirm password' : 'パスワードの確認'}
                  ref={passwordRef2}
                ></input>
                {passwordNotMatch && (
                  <p className="login-popup__error-msg">
                    {languageIndex === 0 ? 'Passwords do not match' : 'パスワードが一致していません'}
                  </p>
                )}
                {accountAlreadyExist && (
                  <p className="login-popup__error-msg">
                    {languageIndex === 0
                      ? 'Account already exists, please sign in'
                      : 'アカウントは既に存在します。サインインしてください'}
                  </p>
                )}
                <div className="login-popup__privacy-container margin-top">
                  <input type="checkbox" ref={checkboxRef1}></input>
                  {languageIndex === 0 ? (
                    <p>
                      By registering, you agree to the{' '}
                      <a
                        href={`${window.location.href.replace('premium', '')}term-condition`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms<br></br>
                      </a>
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
                  ) : (
                    <p>
                      登録することで、
                      <a
                        href={`${window.location.href.replace('premium', '')}term-condition`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        利用規約
                      </a>
                      と
                      <a
                        href={`${window.location.href.replace('premium', '')}term-condition`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        プライバシーポリシー
                      </a>
                      <br></br>
                      に同意したことになります。
                    </p>
                  )}
                </div>
                {signingUp && agreeToPolicy === false && (
                  <p className="login-popup__error-msg">
                    {languageIndex === 0 ? 'Please agree to the policy' : 'ポリシーに同意してください'}
                  </p>
                )}
                <div className="login-popup__privacy-container">
                  <input type="checkbox" ref={checkboxRef2}></input>
                  {languageIndex === 0 ? (
                    <p>
                      I agree to receive news and updates<br></br>from Checkpoint.
                    </p>
                  ) : (
                    <p>
                      Checkpointからのニュースやアップデートの<br></br>受信を希望します。
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="login-popup__submit-btn" onClick={signingUp ? signUpSubmitHandler : signInSubmitHandler}>
              {signingUp ? (
                loading ? (
                  <img className="login-popup__spinner" src={spinner} alt=""></img>
                ) : languageIndex === 0 ? (
                  'Sign up'
                ) : (
                  'サインアップ'
                )
              ) : loading ? (
                <img className="login-popup__spinner" src={spinner} alt=""></img>
              ) : languageIndex === 0 ? (
                'Sign in'
              ) : (
                'サインイン'
              )}
            </div>
            {!signingUp && (
              <div className="login-popup__forget-password" onClick={forgetPasswordHandler}>
                {languageIndex === 0 ? 'Forgot your password?' : 'パスワードをお忘れですか？'}
              </div>
            )}
            {errorDuringAuthen && (
              <p className="login-popup__error-msg">
                {languageIndex === 0
                  ? 'Error occured, please try again later'
                  : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
              </p>
            )}
          </>
        ) : (
          <>
            <p className={`login-popup__title`}>{languageIndex === 0 ? 'Email Verification' : 'メールによる確認'}</p>
            <input
              className="login-popup__input"
              type="text"
              ref={verificationCodeRef}
              placeholder={
                languageIndex === 0 ? 'Verification code (check your email)' : '検証コード（メールを確認してください）'
              }
            ></input>
            {accountAlreadyExist && (
              <p className="login-popup__error-msg">
                {languageIndex === 0
                  ? 'Account already exists, please sign in'
                  : 'アカウントは既に存在します。サインインしてください'}
              </p>
            )}
            {invalidCode && (
              <p className="login-popup__error-msg">
                {languageIndex === 0 ? 'Invalid verification code' : '無効な検証コード'}
              </p>
            )}
            <div className="login-popup__submit-btn no-margin" onClick={verifyHandler}>
              {loading ? <img className="login-popup__spinner" src={spinner} alt=""></img> : 'Verify'}
            </div>
            {errorDuringAuthen && (
              <p className="login-popup__error-msg">
                {languageIndex === 0
                  ? 'Error occured, please try again later'
                  : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPopup;
