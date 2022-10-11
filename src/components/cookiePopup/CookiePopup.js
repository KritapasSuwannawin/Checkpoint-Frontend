import './CookiePopup.scss';

function CookiePopup(props) {
  return (
    <div className="cookie-popup">
      <p>
        This site uses cookie to store information on your computer. Some of these cookies are essential to make our site work and others
        help us improve by giving us some insight into how the site is being used.
        <br></br>
        By using our site, you agree to our{' '}
        <a href={`${window.location.href}cookie-policy`} target="_blank" rel="noreferrer">
          Cookie
        </a>{' '}
        and{' '}
        <a href={`${window.location.href}privacy-policy`} target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
      </p>
      <div onClick={props.closeHandler}>I understand</div>
    </div>
  );
}

export default CookiePopup;
