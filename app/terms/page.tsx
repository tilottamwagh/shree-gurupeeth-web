import type {Metadata} from "next";
import LegalPage from "../LegalPage";

export const metadata:Metadata={title:"Terms of Use | Shri Gurupeeth",description:"Terms of use for the Shri Gurupeeth app and website."};

export default function TermsPage(){return <LegalPage title="Terms of Use" updated="November 7, 2026">
  <p>These terms apply when you use the Shri Gurupeeth app or website. By using the service, you agree to these terms. If you do not agree, stop using the service. Questions can be sent to <a href="mailto:apps@dindoripranit.org">apps@dindoripranit.org</a>.</p>
  <h2>Using the service</h2>
  <p>You may browse as a guest or create an account to use account-based features and sync saved progress. Keep your sign-in credentials secure and provide accurate account information. You are responsible for activity performed through your account.</p>
  <h2>Content and devotional information</h2>
  <p>Devotional texts, service information, Panchang calculations and other materials are provided for devotional and general informational use. Panchang details may vary by location, calculation method or source and should not be treated as a guarantee or as professional, medical, legal or financial advice. Confirm important religious observances with an authoritative source or knowledgeable advisor.</p>
  <p>App content, branding and images may be protected by intellectual property rights. You may use the service for personal, non-commercial purposes. Do not copy, republish, sell or misrepresent protected materials without permission from the rights holder.</p>
  <h2>Acceptable use and availability</h2>
  <p>Do not misuse the service, attempt unauthorized access, interfere with its operation, or use it in a way that violates applicable law or another person’s rights. We may update, suspend or discontinue features to maintain or improve the service. We will make reasonable efforts to keep the service available but cannot guarantee uninterrupted operation.</p>
  <h2>Third-party services</h2>
  <p>Sign-in and cloud progress features use Firebase services provided by Google. Their availability and handling of information are also subject to the relevant third-party terms. See our <a href="/privacy-policy">Privacy Policy</a>.</p>
  <h2>Changes and contact</h2>
  <p>We may revise these terms as the service changes. Updated terms will be posted here with a new date. For questions or account requests, contact <a href="mailto:apps@dindoripranit.org">apps@dindoripranit.org</a>.</p>
</LegalPage>}
