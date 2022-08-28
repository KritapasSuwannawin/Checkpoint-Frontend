import { useState, useRef, useEffect, useCallback } from 'react';
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
import googleSigninBtn from './icon/Google Sign in button Web.svg';
import appleSigninBtn from './icon/Apple Sign in button Web.svg';
import googleSignupBtn from './icon/Google Sign up button Web.svg';
import appleSignupBtn from './icon/Apple Sign up button Web.svg';

function LoginPopup(props) {
  const isJapanese = useSelector((store) => store.language.isJapanese);
  const deviceId = useSelector((store) => store.device.deviceId);

  const dispatch = useDispatch();

  const [signingUp, setSigningUp] = useState(true);
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

  const { closeHandler } = props;

  useEffect(() => {
    if (deviceId) {
      closeHandler();
    }
  }, [deviceId, closeHandler]);

  const signUpSubmitHandler = useCallback(() => {
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

      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/email/verify?email=${email}&is_japanese=${isJapanese}`)
        .then((res) => res.json())
        .then((body) => {
          const { statusCode, data } = body;

          if (statusCode !== 2001) {
            if (statusCode === 3000) {
              setAccountAlreadyExist(true);
            }

            if (statusCode === 4000) {
              throw new Error();
            }

            return;
          }

          const { verificationCode } = data;

          emailRef.current.value = '';

          setEmail(email);
          setPassword(password);
          setReceiveNews(checkboxRef2.current.checked);
          setVerificationCode(verificationCode);
        })
        .catch(() => setErrorDuringAuthen(true))
        .finally(() => setLoading(false));
    }
  }, [isJapanese, loading]);

  const verifyHandler = useCallback(() => {
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

      const requestData = { email, password, loginMethod: 'email', isReceiveNews: receiveNews };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((body) => {
          const { statusCode, data } = body;

          if (statusCode !== 2001) {
            if (statusCode === 3000) {
              setAccountAlreadyExist(true);
            }

            if (statusCode === 4000) {
              throw new Error();
            }

            return;
          }

          dispatch(memberActions.setMember(data.memberData));
          dispatch(backgroundActions.changeBackgroundHandler('0411'));
          dispatch(deviceActions.setNewDevice());
          setLocalStorage(requestData);
        })
        .catch(() => setErrorDuringAuthen(true))
        .finally(() => setLoading(false));
    } else {
      setInvalidCode(true);
    }
  }, [dispatch, email, loading, password, receiveNews, verificationCode]);

  const signInSubmitHandler = useCallback(() => {
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

      const requestData = { email, password, loginMethod: 'email' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((body) => {
          const { statusCode, data } = body;

          if (statusCode !== 2001) {
            if (statusCode === 3001) {
              setAccountNotExist(true);
            }

            if (statusCode === 3002) {
              setIncorrectPassword(true);
            }

            if (statusCode === 4000) {
              throw new Error();
            }

            return;
          }

          const { memberData } = data;
          dispatch(memberActions.setMember(memberData));
          dispatch(backgroundActions.changeBackgroundHandler(memberData.backgroundId));
          dispatch(musicActions.setInitialMusic(memberData.musicId));
          dispatch(musicActions.setMusicCategory(memberData.musicCategory));
          dispatch(musicActions.setFavouriteMusicIdArr(memberData.favouriteMusicIdArr));
          dispatch(musicActions.setPlayFromPlaylist(memberData.playFromPlaylist));
          dispatch(avatarActions.changeAvatarHandler(memberData.avatarId));
          dispatch(deviceActions.setNewDevice());
          setLocalStorage(requestData);
        })
        .catch(() => setErrorDuringAuthen(true))
        .finally(() => setLoading(false));
    }
  }, [dispatch, loading]);

  function setLocalStorage(data) {
    const { email, password, loginMethod } = data;
    localStorage.setItem('CheckpointEmail', email);
    localStorage.setItem('CheckpointPassword', password);
    localStorage.setItem('CheckpointLoginMethod', loginMethod);
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

      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/password/forget?email=${email}&is_japanese=${isJapanese}`)
        .then((res) => res.json())
        .then((body) => {
          const { statusCode, data } = body;

          if (statusCode !== 2001) {
            if (statusCode === 3001) {
              setAccountNotExist(true);
            }

            if (statusCode === 4000) {
              throw new Error();
            }

            return;
          }

          const { verificationCode } = data;

          resetPasswordEmailRef.current.value = '';
          setResetPasswordVerificationCode(verificationCode);
        })
        .catch(() => setErrorDuringAuthen(true))
        .finally(() => setLoading(false));
    } else {
      setInvalidEmail(true);
    }
  }

  function forgetPasswordCheckCodeHandler() {
    if (
      resetPasswordVerificationCodeRef.current.value ===
      crypto.AES.decrypt(resetPasswordVerificationCode, process.env.REACT_APP_CHECKPOINT_SECURITY_KEY).toString(crypto.enc.Utf8)
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

    fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((body) => {
        const { statusCode } = body;

        if (statusCode !== 2000) {
          if (statusCode === 4000) {
            throw new Error();
          }

          return;
        }

        localStorage.removeItem('CheckpointEmail');
        localStorage.removeItem('CheckpointPassword');
        localStorage.removeItem('CheckpointLoginMethod');

        setForgetPassword(false);
      })
      .catch(() => setErrorDuringAuthen(true))
      .finally(() => setLoading(false));
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
        const { email } = result.user.providerData[0];

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

          const requestData = { email, password: this, loginMethod: this, isReceiveNews: checkboxRef2.current.checked };

          fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          })
            .then((res) => res.json())
            .then((body) => {
              const { statusCode, data } = body;

              if (statusCode !== 2001) {
                if (statusCode === 3000) {
                  setAccountAlreadyExist(true);
                }

                if (statusCode === 4000) {
                  throw new Error();
                }

                return;
              }

              dispatch(memberActions.setMember(data.memberData));
              dispatch(backgroundActions.changeBackgroundHandler('0411'));
              dispatch(deviceActions.setNewDevice());
              setLocalStorage(requestData);
            })
            .catch(() => setErrorDuringAuthen(true))
            .finally(() => setLoading(false));
        } else {
          setLoading(true);
          setErrorDuringAuthen(false);
          setIncorrectPassword(false);
          setAccountNotExist(false);

          const requestData = { email, password: this, loginMethod: this };

          fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          })
            .then((res) => res.json())
            .then((body) => {
              const { statusCode, data } = body;

              if (statusCode !== 2001) {
                if (statusCode === 3001) {
                  setAccountNotExist(true);
                }

                if (statusCode === 3002) {
                  setIncorrectPassword(true);
                }

                if (statusCode === 4000) {
                  throw new Error();
                }

                return;
              }

              const { memberData } = data;
              dispatch(memberActions.setMember(memberData));
              dispatch(backgroundActions.changeBackgroundHandler(memberData.backgroundId));
              dispatch(musicActions.setInitialMusic(memberData.musicId));
              dispatch(musicActions.setMusicCategory(memberData.musicCategory));
              dispatch(musicActions.setFavouriteMusicIdArr(memberData.favouriteMusicIdArr));
              dispatch(musicActions.setPlayFromPlaylist(memberData.playFromPlaylist));
              dispatch(avatarActions.changeAvatarHandler(memberData.avatarId));
              dispatch(deviceActions.setNewDevice());
              setLocalStorage(requestData);
            })
            .catch(() => setErrorDuringAuthen(true))
            .finally(() => setLoading(false));
        }
      })
      .catch(() => setErrorDuringAuthen(true));
  }

  useEffect(() => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && !forgetPassword) {
        if (verificationCode) {
          verifyHandler();
        } else if (!signingUp) {
          signInSubmitHandler();
        } else if (signingUp) {
          signUpSubmitHandler();
        }
      }
    });
  }, [forgetPassword, signInSubmitHandler, signUpSubmitHandler, signingUp, verificationCode, verifyHandler]);

  if (forgetPassword) {
    return (
      <div className="login-popup">
        <form className="login-popup__form">
          <div className="login-popup__close-btn" onClick={() => closeHandler()}></div>
          <div className="login-popup__title-container">
            <p
              className={`login-popup__title ${!signingUp ? 'not-current' : ''} ${isJapanese ? 'small' : ''}`}
              onClick={signUpClickHandler.bind(true)}
            >
              {!isJapanese ? 'Sign up' : 'サインアップ'}
            </p>
            <p
              className={`login-popup__title ${signingUp ? 'not-current' : ''} ${isJapanese ? 'small' : ''}`}
              onClick={signUpClickHandler.bind(false)}
            >
              {!isJapanese ? 'Sign in' : 'サインイン'}
            </p>
          </div>
          <p className={`login-popup__sub-title`}>{!isJapanese ? 'Reset Password' : 'パスワードの再設定'}</p>
          {!resetPasswordVerificationCode ? (
            <>
              {!isJapanese ? (
                <p className="login-popup__description">
                  Please enter your email address<br></br>and we'll send you a link to reset your password.
                </p>
              ) : (
                <p className="login-popup__description">
                  ご利用中のメールアドレスを入力してください。 <br></br>パスワード再設定のためのURLをお送りします。
                </p>
              )}
              <input
                className="login-popup__input"
                type="text"
                id="email"
                ref={resetPasswordEmailRef}
                placeholder={!isJapanese ? 'Email' : 'メール'}
              ></input>
            </>
          ) : !allowEnterNewPassword ? (
            <input
              className="login-popup__input"
              type="text"
              ref={resetPasswordVerificationCodeRef}
              placeholder={!isJapanese ? 'Verification code (check your email)' : '検証コード（メールを確認してください）'}
            ></input>
          ) : (
            <>
              <input
                className="login-popup__input"
                type="password"
                ref={newPasswordRef}
                autoComplete="on"
                placeholder={!isJapanese ? 'New Password' : '新しいパスワード'}
              ></input>
              <input
                className="login-popup__input"
                type="password"
                ref={confirmNewPasswordRef}
                autoComplete="on"
                placeholder={!isJapanese ? 'Confirm new password' : '新しいパスワードの確認'}
              ></input>
            </>
          )}
          {invalidEmail && <p className="login-popup__error-msg">{!isJapanese ? 'Invalid email' : '無効なメール'}</p>}
          {newPasswordNotMatch && (
            <p className="login-popup__error-msg">{!isJapanese ? 'Passwords do not match' : 'パスワードが一致していません'}</p>
          )}
          {invalidNewPassword && (
            <p className="login-popup__error-msg">
              {!isJapanese ? 'Password must contain at least 6 characters' : '>パスワードには6文字以上が含まれている必要があります'}
            </p>
          )}
          {!isJapanese ? (
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
              {loading ? <img className="login-popup__spinner" src={spinner} alt=""></img> : !isJapanese ? 'Send' : '送信'}
            </div>
          ) : (
            <div
              className="login-popup__submit-btn no-margin"
              onClick={allowEnterNewPassword ? resetPasswordHandler : forgetPasswordCheckCodeHandler}
            >
              {loading ? <img className="login-popup__spinner" src={spinner} alt=""></img> : !isJapanese ? 'Submit' : '送信'}
            </div>
          )}
          {invalidResetPasswordVerificationCode && (
            <p className="login-popup__error-msg">{!isJapanese ? 'Invalid verification code' : '無効な検証コード'}</p>
          )}
          {accountNotExist && (
            <p className="login-popup__error-msg">
              {!isJapanese ? 'Account does not exist, please sign up' : 'アカウントが存在しません。サインアップしてください'}
            </p>
          )}
          {errorDuringAuthen && (
            <p className="login-popup__error-msg">
              {!isJapanese ? 'Error occured, please try again later' : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="login-popup">
      <form className="login-popup__form">
        <div className="login-popup__close-btn" onClick={() => closeHandler()}></div>
        {!verificationCode ? (
          <>
            <div className="login-popup__title-container">
              <p
                className={`login-popup__title ${!signingUp ? 'not-current' : ''} ${isJapanese ? 'small' : ''}`}
                onClick={signUpClickHandler.bind(true)}
              >
                {!isJapanese ? 'Sign up' : 'サインアップ'}
              </p>
              <p
                className={`login-popup__title ${signingUp ? 'not-current' : ''} ${isJapanese ? 'small' : ''}`}
                onClick={signUpClickHandler.bind(false)}
              >
                {!isJapanese ? 'Sign in' : 'サインイン'}
              </p>
            </div>
            <img
              src={signingUp ? googleSignupBtn : googleSigninBtn}
              alt=""
              className="login-popup__google"
              onClick={loginHandler.bind('google')}
            ></img>
            <img
              src={signingUp ? appleSignupBtn : appleSigninBtn}
              alt=""
              className="login-popup__apple"
              onClick={loginHandler.bind('apple')}
            ></img>
            <div className="login-popup__seperator"></div>
            <input
              className="login-popup__input"
              type="text"
              placeholder={!isJapanese ? 'Email' : 'メール'}
              id="email"
              ref={emailRef}
            ></input>
            {invalidEmail && <p className="login-popup__error-msg">{!isJapanese ? 'Invalid email' : '無効なメール'}</p>}
            <input
              className="login-popup__input"
              type="password"
              placeholder={!isJapanese ? 'Password' : 'パスワード'}
              autoComplete="on"
              ref={passwordRef1}
            ></input>
            {invalidPassword && (
              <p className="login-popup__error-msg">
                {!isJapanese ? 'Password must contain at least 6 characters' : '>パスワードには6文字以上が含まれている必要があります'}
              </p>
            )}
            {!signingUp && (
              <>
                {incorrectPassword && <p className="login-popup__error-msg">{!isJapanese ? 'Incorect password' : '間違ったパスワード'}</p>}
                {accountNotExist && (
                  <p className="login-popup__error-msg">
                    {!isJapanese ? 'Account does not exist, please sign up' : 'アカウントが存在しません。サインアップしてください'}
                  </p>
                )}
              </>
            )}
            {signingUp && (
              <>
                <input
                  className="login-popup__input"
                  type="password"
                  placeholder={!isJapanese ? 'Confirm password' : 'パスワードの確認'}
                  autoComplete="on"
                  ref={passwordRef2}
                ></input>
                {passwordNotMatch && (
                  <p className="login-popup__error-msg">{!isJapanese ? 'Passwords do not match' : 'パスワードが一致していません'}</p>
                )}
                {accountAlreadyExist && (
                  <p className="login-popup__error-msg">
                    {!isJapanese ? 'Account already exists, please sign in' : 'アカウントは既に存在します。サインインしてください'}
                  </p>
                )}
                <div className="login-popup__privacy-container margin-top">
                  <input type="checkbox" ref={checkboxRef1} defaultChecked></input>
                  {!isJapanese ? (
                    <p>
                      By registering, you agree to the{' '}
                      <a href={`${window.location.href.replace('premium', '')}term-condition`} target="_blank" rel="noreferrer">
                        Terms<br></br>
                      </a>
                      and{' '}
                      <a href={`${window.location.href.replace('premium', '')}term-condition`} target="_blank" rel="noreferrer">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  ) : (
                    <p>
                      登録することで、
                      <a href={`${window.location.href.replace('premium', '')}term-condition`} target="_blank" rel="noreferrer">
                        利用規約
                      </a>
                      と
                      <a href={`${window.location.href.replace('premium', '')}term-condition`} target="_blank" rel="noreferrer">
                        プライバシーポリシー
                      </a>
                      <br></br>
                      に同意したことになります。
                    </p>
                  )}
                </div>
                {signingUp && agreeToPolicy === false && (
                  <p className="login-popup__error-msg">{!isJapanese ? 'Please agree to the policy' : 'ポリシーに同意してください'}</p>
                )}
                <div className="login-popup__privacy-container">
                  <input type="checkbox" ref={checkboxRef2} defaultChecked></input>
                  {!isJapanese ? (
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
                ) : !isJapanese ? (
                  'Sign up'
                ) : (
                  'サインアップ'
                )
              ) : loading ? (
                <img className="login-popup__spinner" src={spinner} alt=""></img>
              ) : !isJapanese ? (
                'Sign in'
              ) : (
                'サインイン'
              )}
            </div>
            {!signingUp && (
              <div className="login-popup__forget-password" onClick={forgetPasswordHandler}>
                {!isJapanese ? 'Forgot your password?' : 'パスワードをお忘れですか？'}
              </div>
            )}
            {errorDuringAuthen && (
              <p className="login-popup__error-msg">
                {!isJapanese ? 'Error occured, please try again later' : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
              </p>
            )}
          </>
        ) : (
          <>
            <p className={`login-popup__title ${isJapanese ? 'small' : ''}`}>{!isJapanese ? 'Email Verification' : 'メールによる確認'}</p>
            <input
              className="login-popup__input"
              type="text"
              ref={verificationCodeRef}
              placeholder={!isJapanese ? 'Verification code (check your email)' : '検証コード（メールを確認してください）'}
            ></input>
            {accountAlreadyExist && (
              <p className="login-popup__error-msg">
                {!isJapanese ? 'Account already exists, please sign in' : 'アカウントは既に存在します。サインインしてください'}
              </p>
            )}
            {invalidCode && <p className="login-popup__error-msg">{!isJapanese ? 'Invalid verification code' : '無効な検証コード'}</p>}
            <div className="login-popup__submit-btn no-margin" onClick={verifyHandler}>
              {loading ? <img className="login-popup__spinner" src={spinner} alt=""></img> : 'Verify'}
            </div>
            {errorDuringAuthen && (
              <p className="login-popup__error-msg">
                {!isJapanese ? 'Error occured, please try again later' : 'エラーが発生しました。しばらくしてからもう一度お試しください'}
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
