import './Policy.scss';

function Policy(props) {
  return (
    <div className="policy">
      <ul>
        <li>
          <a href={window.location.href.replace('policy', 'privacy-policy')} target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'term-condition')} target="_blank" rel="noreferrer">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'disclaimer')} target="_blank" rel="noreferrer">
            Disclaimer
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Policy;
