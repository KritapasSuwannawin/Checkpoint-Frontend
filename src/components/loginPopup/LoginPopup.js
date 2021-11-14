import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import './LoginPopup.scss';

import { memberActions } from '../../store/memberSlice';

function LoginPopup(props) {
  const dispatch = useDispatch();

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [errorDuringAuthen, setErrorDuringAuthen] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  function closeHandler() {
    props.closeHandler();
  }

  function submitHandler() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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
      const data = { email, password, loginMethod: 'email' };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/member/login`, {
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
          setPasswordNotMatch(errorMessage === 'invalid password');

          if (!errorMessage) {
            dispatch(memberActions.setMember(result.data[0]));
            props.closeHandler();
          }
        })
        .catch(() => {});
    }
  }

  return (
    <div className="login-popup">
      <form>
        <div className="login-popup__close-btn" onClick={closeHandler}></div>
        <p className="login-popup__title">Become a member!</p>
        <div className="login-popup__input-section">
          <label>Email</label>
          <input type="text" placeholder="email" id="email" ref={emailRef}></input>
        </div>
        {invalidEmail && <p className="login-popup__error-msg">Invalid email</p>}
        <div className="login-popup__input-section">
          <label>Password</label>
          <input type="password" placeholder="password" ref={passwordRef}></input>
        </div>
        {invalidPassword && <p className="login-popup__error-msg">Password must contain at least 6 characters</p>}
        {passwordNotMatch && <p className="login-popup__error-msg">Invalid password</p>}
        <div className="login-popup__submit-btn" onClick={submitHandler}>
          Join
        </div>
        {errorDuringAuthen && <p className="login-popup__error-msg">Error occured, please try again later</p>}
      </form>
    </div>
  );
}

export default LoginPopup;
