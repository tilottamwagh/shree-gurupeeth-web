import type {Metadata} from "next";
import LegalPage from "../LegalPage";

export const metadata:Metadata={title:"Privacy Policy | Shri Gurupeeth",description:"Privacy policy for the Shri Gurupeeth app and website."};

export default function PrivacyPolicyPage(){return <LegalPage title="Privacy Policy" updated="November 7, 2026">
  <p>This policy explains how the Shri Gurupeeth app and website handle information. It applies to guest use and to users who sign in. The app is provided for the Dindori Pranit Seva Marg. For privacy questions, contact <a href="mailto:apps@dindoripranit.org">apps@dindoripranit.org</a>.</p>
  <h2>Information we handle</h2>
  <ul>
    <li><b>Guest use:</b> reading position, Charitra completion count, mantra count, language and theme preferences are stored in the browser or device storage. Guest progress is not associated with an online account and is not synced between devices.</li>
    <li><b>Account information:</b> if you sign in with email and password or Google, Firebase Authentication processes your sign-in credentials. We receive account identifiers and, when supplied by the sign-in provider, your email address, name and profile photo.</li>
    <li><b>Saved progress:</b> for signed-in users, the app stores reading progress, completion totals and saved mantra and mala counts in Firebase Cloud Firestore so they can be restored with that account. Progress is also kept in local device storage and any changes made offline are queued there until the device reconnects and can sync them.</li>
    <li><b>Usage and session records:</b> signed-in use may create login events, pages or devotional items opened, progress-save events, timestamps, and a shortened browser/device user-agent string. These records support account operation, progress features and administrator activity reports.</li>
  </ul>
  <h2>How information is used</h2>
  <p>We use the information above to authenticate users, restore their saved progress, operate and protect the service, troubleshoot issues, and prepare activity reports for authorized administrators. Guest progress is used only on the device or browser where it is saved.</p>
  <h2>Service providers and sharing</h2>
  <p>Firebase Authentication and Cloud Firestore, provided by Google, are used for account sign-in and cloud storage. Information needed for those services is processed by Google under its applicable terms and privacy practices. Authorized administrators can access account and activity records for service administration. We do not sell personal information or use an advertising SDK in this app.</p>
  <h2>Storage, security and retention</h2>
  <p>Guest data and the local offline copy of signed-in progress remain in browser or device storage until cleared by the user, browser or operating system. Account and activity records are stored in Firebase and retained while needed to provide and administer the service. Access is controlled using Firebase Authentication and Firestore security rules. No internet service can guarantee absolute security.</p>
  <p>You may request deletion of your account and associated records using the instructions on our <a href="/account-deletion">Account deletion page</a>. We may retain limited information where required for legal obligations or legitimate security purposes and will explain any such retention when responding to a request. Signing out does not delete account data. Clearing browser storage removes guest data from that browser but does not delete cloud data.</p>
  <h2>Your choices</h2>
  <p>You can use the app as a guest without creating an account. You can clear browser or device storage to remove local guest progress and offline copies. You may contact us to ask about, correct or request deletion of information associated with your account.</p>
  <h2>Children and changes</h2>
  <p>The app is a general devotional and informational service and is not specifically directed to children. We may update this policy when the app or its data practices change. The latest version will be posted on this page with its update date.</p>
</LegalPage>}
