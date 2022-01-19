import './Policy.scss';

function Policy(props) {
  return (
    <div className="policy">
      <ul>
        <li>
          <a href={window.location.href.replace('policy', 'term-condition')} target="_blank" rel="noreferrer">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'privacy-policy')} target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'cookie-policy')} target="_blank" rel="noreferrer">
            Cookie Policy
          </a>
        </li>
        <li>
          <a
            href={window.location.href.replace('policy', 'gdpr-singapore-japan-statement')}
            target="_blank"
            rel="noreferrer"
          >
            GDPR, Singapore, Japan Statement
          </a>
        </li>
        <li>
          <a
            href={window.location.href.replace('policy', 'cancellation-refund-policy')}
            target="_blank"
            rel="noreferrer"
          >
            Cancellation & Refund Policy
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Policy;
