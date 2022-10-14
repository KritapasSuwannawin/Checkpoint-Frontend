import './Policy.scss';

function Policy(props) {
  return (
    <div className="policy">
      <ul>
        <li>
          <a href={window.location.href.replace('policy', 'term-condition')} target="_blank" rel="noreferrer">
            Terms & Conditions (利用規約)
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'privacy-policy')} target="_blank" rel="noreferrer">
            Privacy Policy (プライバシーポリシー)
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'cookie-policy')} target="_blank" rel="noreferrer">
            Cookie Policy (クッキーポリシー)
          </a>
        </li>
        <li>
          <a href={window.location.href.replace('policy', 'gdpr-singapore-japan-statement')} target="_blank" rel="noreferrer">
            GDPR, Singapore, Japan Statement (GDPR、シンガポール、日本声明)
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Policy;
