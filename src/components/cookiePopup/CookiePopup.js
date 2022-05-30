import { useSelector } from 'react-redux';

function CookiePopup(props) {
  const languageIndex = useSelector((store) => store.language.languageIndex);

  return (
    <div className="cookie-popup">
      <p>
        {languageIndex === 0
          ? 'This site uses cookie to store information on your computer. Some of these cookies are essential to make our site work and others help us improve by giving us some insight into how the site is being used.'
          : 'このサイトでは、お客様のコンピュータに情報を保存するためにクッキーを使用しています。これらのクッキーの中には、当サイトの運営に必要不可欠なものもあれば、サイトの利用状況を把握することで改善に役立てるものもあります。'}
        <br></br>
        {languageIndex === 0 ? (
          <>
            By using our site, you agree to our{' '}
            <a href={`${window.location.href}cookie-policy`} target="_blank" rel="noreferrer">
              Cookie
            </a>{' '}
            and{' '}
            <a href={`${window.location.href}privacy-policy`} target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </>
        ) : (
          <>
            このサイトを利用することにより、お客様は当社の
            <a href={`${window.location.href}cookie-policy`} target="_blank" rel="noreferrer">
              クッキー
            </a>
            および
            <a href={`${window.location.href}privacy-policy`} target="_blank" rel="noreferrer">
              プライバシーポリシー
            </a>
            に同意したものとみなされます。
          </>
        )}
      </p>
      <div onClick={props.closeHandler}>{languageIndex === 0 ? 'I understand' : 'わかりました'}</div>
    </div>
  );
}

export default CookiePopup;
