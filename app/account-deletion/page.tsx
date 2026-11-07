import type {Metadata} from "next";
import LegalPage from "../LegalPage";

export const metadata:Metadata={title:"Account Deletion | Shri Gurupeeth",description:"How to request deletion of your Shri Gurupeeth account and associated data."};

export default function AccountDeletionPage(){return <LegalPage title="Account and Data Deletion" updated="November 7, 2026">
  <p>You can request deletion of your Shri Gurupeeth account and the personal data associated with it without reinstalling or signing in to the app.</p>
  <h2>Request account deletion</h2>
  <ol>
    <li>Email <a href="mailto:apps@dindoripranit.org?subject=Shri%20Gurupeeth%20account%20deletion%20request">apps@dindoripranit.org</a> with the subject <b>Shri Gurupeeth account deletion request</b>.</li>
    <li>Send the request from the email address linked to your account, or include that address so we can verify the request. Do not send your password or one-time codes.</li>
    <li>We will verify the request and arrange deletion of the Firebase Authentication account and associated account profile, saved progress, login, session and activity records.</li>
  </ol>
  <p>This page is the external deletion-request route. In the app, open <b>Account</b> and choose <b>Delete account or request deletion</b> to reach these instructions. Signing out alone does not delete your account or cloud records.</p>
  <h2>Guest data</h2>
  <p>Guest progress and offline copies of signed-in progress are stored in browser or device storage. Clearing the app’s or browser’s site storage removes those local copies. A server-side account deletion request does not automatically clear storage on your device. Uninstalling the app may also clear its local data, depending on the device.</p>
  <h2>Retention</h2>
  <p>We will delete account-associated data when the request is verified, except for limited information that must be retained for legal compliance or legitimate security purposes. If anything must be retained, we will explain what and why in our response. For help, contact <a href="mailto:apps@dindoripranit.org">apps@dindoripranit.org</a>.</p>
</LegalPage>}
