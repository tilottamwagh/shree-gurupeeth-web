import type {Metadata} from "next";
import LegalPage from "../LegalPage";

export const metadata:Metadata={title:"Support | Shri Gurupeeth",description:"Contact support for the Shri Gurupeeth app and website."};

export default function SupportPage(){return <LegalPage title="Help and Support" updated="November 7, 2026">
  <p>For help with the Shri Gurupeeth app or website, contact our support team by email.</p>
  <div className="legal-contact-card"><b>Email support</b><a href="mailto:apps@dindoripranit.org">apps@dindoripranit.org</a><p>For sign-in issues, include the email address associated with your account and a short description of the problem. Never include your password or verification code.</p></div>
  <h2>Common account help</h2>
  <ul><li>Use <a href="/forgot-password">Forgot password</a> on the sign-in page to request a reset link.</li><li>You can use the app as a guest without signing in. Guest progress is saved locally on that browser or device.</li><li>For account and data deletion, visit <a href="/account-deletion">Account and Data Deletion</a>.</li></ul>
  <h2>App information</h2>
  <p>Shri Gurupeeth | Dindori Pranit Seva Marg. The app provides devotional reading, mantra counting, Panchang information and related service content.</p>
</LegalPage>}
