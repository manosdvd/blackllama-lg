import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy · Camp Lawton",
  description: "Privacy information for the Camp Lawton Leader Hub and official council registration.",
};

import { OFFICIAL_REGISTRATION_URL } from "../../lib/registration";

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <article className="policy-page">
        <p className="section-kicker">Site policy</p>
        <h1>Privacy</h1>
        <p className="policy-lead">
          Camp Lawton and the Catalina Council value your privacy. This site is an informational leader resource and does not collect sensitive health or personal participant records.
        </p>

        <h2>Official Camp Registration</h2>
        <p>
          Official camp registration and payments are handled through Catalina Council&apos;s Black Pug event page at{" "}
          <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
            scoutingevent.com/011-ScoutCamp2027
          </a>
          . Review the privacy policy linked on that page before submitting participant information.
        </p>

        <h2>Website Use &amp; Local Storage</h2>
        <p>
          The Leader Hub uses local browser storage solely to remember user-controlled preferences such as interactive packing list checkmarks. These entries remain on your device and are not transmitted to camp servers.
        </p>

        <h2>Health &amp; Safeguarding Documents</h2>
        <p>
          Do not transmit Annual Health and Medical Records, birth dates, or sensitive youth documents via email or web contact forms. Health forms (Parts A, B, and C) must be handed directly in hard copy to the Camp Health Officer at Sunday check-in.
        </p>

        <p className="policy-updated">Last reviewed September 26, 2026.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
