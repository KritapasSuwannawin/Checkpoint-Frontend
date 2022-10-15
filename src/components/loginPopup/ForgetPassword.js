import { useState, useRef } from 'react';
import crypto from 'crypto-js';

import './LoginPopup.scss';

import spinner from '../../svg/20px/spinner-solid.svg';

function ForgetPassword(props) {
  const { closeHandler, signUpClickHandler, setForgetPasswordHandler } = props;

  const [loading, setLoading] = useState(false);
  const [allowEnterNewPassword, setAllowEnterNewPassword] = useState(false);

  const [email, setEmail] = useState(undefined);
  const [resetPasswordVerificationCode, setResetPasswordVerificationCode] = useState(undefined);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [accountNotExist, setAccountNotExist] = useState(false);
  const [errorDuringAuthen, setErrorDuringAuthen] = useState(false);
  const [invalidResetPasswordVerificationCode, setInvalidResetPasswordVerificationCode] = useState(false);
  const [newPasswordNotMatch, setNewPasswordNotMatch] = useState(false);
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);

  const resetPasswordEmailRef = useRef();
  const resetPasswordVerificationCodeRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

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

      fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/member/password/forget?email=${email}`)
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

        setForgetPasswordHandler(false);
      })
      .catch(() => setErrorDuringAuthen(true))
      .finally(() => setLoading(false));
  }

  function submitHandler(e) {
    e.preventDefault();

    !resetPasswordVerificationCode
      ? forgetPasswordEmailSendHandler()
      : allowEnterNewPassword
      ? resetPasswordHandler()
      : forgetPasswordCheckCodeHandler();
  }

  return (
    <div className="login-popup">
      <form className="login-popup__form" onSubmit={submitHandler}>
        <div className="login-popup__close-btn" onClick={closeHandler}></div>
        <div className="login-popup__title-container">
          <p className="login-popup__title not-current" onClick={signUpClickHandler.bind(true)}>
            Sign up
          </p>
          <p className="login-popup__title" onClick={signUpClickHandler.bind(false)}>
            Sign in
          </p>
        </div>
        <p className={`login-popup__sub-title`}>Reset Password</p>
        {!resetPasswordVerificationCode ? (
          <>
            <p className="login-popup__description">
              Please enter your email address<br></br>and we'll send you a link to reset your password.
            </p>
            <input className="login-popup__input" type="text" id="email" ref={resetPasswordEmailRef} placeholder="Email"></input>
          </>
        ) : !allowEnterNewPassword ? (
          <input
            className="login-popup__input"
            type="text"
            ref={resetPasswordVerificationCodeRef}
            placeholder="Verification code (check your email)"
          ></input>
        ) : (
          <>
            <input className="login-popup__input" type="password" ref={newPasswordRef} autoComplete="on" placeholder="New Password"></input>
            <input
              className="login-popup__input"
              type="password"
              ref={confirmNewPasswordRef}
              autoComplete="on"
              placeholder="Confirm new password"
            ></input>
          </>
        )}
        {invalidEmail && <p className="login-popup__error-msg">Invalid email</p>}
        {newPasswordNotMatch && <p className="login-popup__error-msg">Passwords do not match</p>}
        {invalidNewPassword && <p className="login-popup__error-msg">Password must contain at least 6 characters</p>}
        <p className="login-popup__contact">
          If you need any help, please contact<br></br>
          <span>inquiry@checkpoint.tokyo</span>
        </p>

        <button className="login-popup__submit-btn no-margin">
          {loading ? <img className="login-popup__spinner" src={spinner} alt=""></img> : !resetPasswordVerificationCode ? 'Send' : 'Submit'}
        </button>
        {invalidResetPasswordVerificationCode && <p className="login-popup__error-msg">Invalid verification code</p>}
        {accountNotExist && <p className="login-popup__error-msg">Account does not exist, please sign up</p>}
        {errorDuringAuthen && <p className="login-popup__error-msg">Error occured, please try again later</p>}
      </form>
    </div>
  );
}

export default ForgetPassword;
