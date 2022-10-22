import { Link, Routes, Route, Navigate } from 'react-router-dom';

import TermCondition from './TermCondition';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import Gdpr from './Gdpr';
import './Policy.scss';

function Policy(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="policy">
            <ul>
              <li>
                <Link to="term-condition">Terms & Conditions (利用規約)</Link>
              </li>
              <li>
                <Link to="privacy-policy">Privacy Policy (プライバシーポリシー)</Link>
              </li>
              <li>
                <Link to="cookie-policy">Cookie Policy (クッキーポリシー)</Link>
              </li>
              <li>
                <Link to="gdpr">GDPR, Singapore, Japan Statement (GDPR、シンガポール、日本声明)</Link>
              </li>
            </ul>
          </div>
        }
      ></Route>
      <Route path="term-condition" element={<TermCondition></TermCondition>}></Route>
      <Route path="privacy-policy" element={<PrivacyPolicy></PrivacyPolicy>}></Route>
      <Route path="cookie-policy" element={<CookiePolicy></CookiePolicy>}></Route>
      <Route path="gdpr" element={<Gdpr></Gdpr>}></Route>
      <Route path="/*" element={<Navigate replace to="/policy"></Navigate>}></Route>
    </Routes>
  );
}

export default Policy;
