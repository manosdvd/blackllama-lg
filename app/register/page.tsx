import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "2027 Summer Camp Registration & Fees",
  description: "Official registration for Scouts BSA Summer Camp 2027 at Camp Lawton. Session dates, in-council and out-of-council fees, early bird discounts, and registration links.",
};

import { OFFICIAL_REGISTRATION_URL, WEEK1_REGISTRATION_URL, WEEK2_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL, MEDICAL_FORM_URL } from "../../lib/registration";

export default function RegisterPage() {
  return (
    <main>
      <SiteHeader current="/register" />

      <section className="page-intro plan-intro">
        <div>
          <p className="section-kicker">Catalina Council · Scouts BSA</p>
          <h1>Camp Lawton Summer Camp 2027</h1>
          <p>
            Spend a week building skills and exploring the Santa Catalina Mountains. Choose a camp session and register through Catalina Council’s official Black Pug event page.
          </p>
        </div>
      </section>

      <section className="page-content registration-page">
        <div className="registration-hero-banner">
          <div>
            <span className="registration-badge">Official Council Registration</span>
            <h2>Registration is Open for 2027</h2>
            <p>
              Register as a <strong>unit with at least two adult leaders</strong>, or use <strong>provisional registration</strong> for individuals and units with fewer than two adult leaders.
            </p>
          </div>
          <div className="registration-hero-cta">
            <a className="button button-large" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
              Register on Black Pug ↗
            </a>
            <small>Direct portal: scoutingevent.com/011-ScoutCamp2027</small>
          </div>
        </div>

        <div className="registration-grid">
          <section className="registration-main-col">
            <article className="reg-card">
              <header>
                <span className="section-kicker">2027 Sessions</span>
                <h2>When &amp; Where</h2>
                <p>Camp Lawton · 12900 E. Organization Ridge Rd, Tucson, Arizona 85619 · Phone: 520-750-0385 · Coords: 32.4033251, -110.7214508</p>
              </header>

              <div className="session-cards-grid">
                <div className="session-reg-card">
                  <div className="session-reg-header">
                    <span className="tag">Session 1</span>
                    <h3>Scouts BSA Summer Camp Week 1</h3>
                    <p className="session-dates">Sunday, June 6, 2027 (2:00 PM MST) – Saturday, June 12, 2027 (10:00 AM MST)</p>
                  </div>
                  <ul className="session-meta-list">
                    <li><strong>Capacity:</strong> Limited to 150 youth participants</li>
                    <li><strong>Unit Limit:</strong> Limit one registration per unit</li>
                    <li><strong>Registration Closes:</strong> May 23, 2027 at 11:59 PM MST</li>
                  </ul>
                  <a className="button" href={WEEK1_REGISTRATION_URL} target="_blank" rel="noreferrer">
                    Save a Spot — Week 1 ↗
                  </a>
                </div>

                <div className="session-reg-card">
                  <div className="session-reg-header">
                    <span className="tag">Session 2</span>
                    <h3>Scouts BSA Summer Camp Week 2</h3>
                    <p className="session-dates">Sunday, June 13, 2027 (2:00 PM MST) – Saturday, June 19, 2027 (10:00 AM MST)</p>
                  </div>
                  <ul className="session-meta-list">
                    <li><strong>Capacity:</strong> Limited to 150 youth participants</li>
                    <li><strong>Unit Limit:</strong> Limit one registration per unit</li>
                    <li><strong>Registration Closes:</strong> May 30, 2027 at 11:59 PM MST</li>
                  </ul>
                  <a className="button" href={WEEK2_REGISTRATION_URL} target="_blank" rel="noreferrer">
                    Save a Spot — Week 2 ↗
                  </a>
                </div>
              </div>
            </article>

            <article className="reg-card">
              <header>
                <span className="section-kicker">Fee Schedule &amp; Discounts</span>
                <h2>Camp Fees &amp; Early Bird Savings</h2>
                <p>Register early to take advantage of significant discounts and credits. Pay over time is available for all registrations.</p>
              </header>

              <div className="pricing-columns">
                <div className="pricing-column in-council">
                  <div className="pricing-column-header">
                    <span className="pricing-pill">Catalina Council</span>
                    <h3>In-Council Fees</h3>
                    <div className="pricing-amount">
                      <span className="currency">$</span>
                      <span className="val">400</span>
                      <span className="per">/ Scout</span>
                    </div>
                    <p className="adult-fee"><strong>$100</strong> per Adult &bull; <strong>$40</strong> deposit per youth</p>
                  </div>
                  <div className="pricing-incentives">
                    <h4>Early Bird Credits for In-Council Youth:</h4>
                    <ul>
                      <li>
                        <strong>Register before 12/31/26:</strong> You pay <strong>$200</strong> (including deposit) and receive a $200 credit (<em>Paid In Full</em>).
                      </li>
                      <li>
                        <strong>Register before 3/31/27:</strong> You pay <strong>$300</strong> (including deposit) and receive a $100 credit (<em>Paid In Full</em>).
                      </li>
                      <li>
                        <strong>Pay Over Time:</strong> Flexible installment payment schedule available.
                      </li>
                      <li>
                        <strong>Camperships:</strong> Financial assistance up to $360 per Scout is available.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pricing-column out-of-council">
                  <div className="pricing-column-header">
                    <span className="pricing-pill">Visiting Councils</span>
                    <h3>Out-of-Council Fees</h3>
                    <div className="pricing-amount">
                      <span className="currency">$</span>
                      <span className="val">450</span>
                      <span className="per">/ Scout</span>
                    </div>
                    <p className="adult-fee"><strong>$100</strong> per Adult &bull; <strong>$40</strong> deposit per youth</p>
                  </div>
                  <div className="pricing-incentives">
                    <h4>Early Bird Discounts for Out-of-Council Youth:</h4>
                    <ul>
                      <li>
                        <strong>Register &amp; pay in full by 12/31/26:</strong> Receive a <strong>$50 discount</strong>.
                      </li>
                      <li>
                        <strong>Register &amp; pay in full by 3/31/27:</strong> Receive a <strong>$25 discount</strong>.
                      </li>
                      <li>
                        <strong>Pay Over Time:</strong> Payment installments available.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <article className="reg-card">
              <header>
                <span className="section-kicker">Attendance Options</span>
                <h2>Registrant Types &amp; Unit Requirements</h2>
                <p>Camp Lawton supports traditional unit reservations, provisional campers, visiting councils, and volunteer staff.</p>
              </header>

              <div className="registrant-types-grid">
                <div className="registrant-type-card">
                  <h4>Unit Registrations (In-Council &amp; Out-of-Council)</h4>
                  <ul>
                    <li><strong>Adult Leadership Ratio:</strong> A minimum of 2 registered adult leaders (Scouts BSA Adult or Out-of-Council Adult) is required per unit to satisfy two-deep leadership policies.</li>
                    <li><strong>Unit Limit:</strong> Limit one registration per unit.</li>
                    <li><strong>Participants:</strong> Units register Scouts BSA Youth ($400 in-council) or Out-of-Council Youth ($450 out-of-council) plus their adult leadership ($100 each). A $40 deposit per youth reserves your spot.</li>
                  </ul>
                </div>

                <div className="registrant-type-card">
                  <h4>Provisional Campers (Individual Scouts &amp; Small Groups)</h4>
                  <ul>
                    <li><strong>Individual Scouts:</strong> Youth whose home unit cannot attend or who want an additional week of camp can register individually as a <em>Provisional Scout</em> ($400 in-council / $450 out-of-council).</li>
                    <li><strong>Units with &lt; 2 Leaders:</strong> If your unit has fewer than two adult leaders available, register under Provisional registration. Your Scouts and leaders will be paired with an approved host troop and camp leadership.</li>
                    <li><strong>Provisional Adults:</strong> Registered as <em>Provisional Adult</em> ($100 in-council) or <em>Out-of-Council Adult - Provisional</em> ($100).</li>
                  </ul>
                </div>

                <div className="registrant-type-card">
                  <h4>Camp Staff &amp; CITs</h4>
                  <ul>
                    <li><strong>Youth Staff &amp; Adult Staff:</strong> Camp Lawton staff members and counselors-in-training register at <strong>$0.00</strong> on Black Pug following staff appointment and director approval.</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="reg-card">
              <header>
                <span className="section-kicker">Program Details</span>
                <h2>What&apos;s Included in Your Registration</h2>
              </header>
              <div className="included-grid">
                <div className="included-item">
                  <strong>Camping Fees</strong>
                  <p>Camping fees for your selected session.</p>
                </div>
                <div className="included-item">
                  <strong>Meals &amp; Dining</strong>
                  <p>A basic meal plan is included. Other plans may carry an additional charge.</p>
                </div>
                <div className="included-item">
                  <strong>Merit Badge Instruction</strong>
                  <p>Instruction is included. Some badges charge separately for materials at class registration.</p>
                </div>
                <div className="included-item">
                  <strong>Camp T-Shirt &amp; Patches</strong>
                  <p>Official 2027 Camp Lawton participant patch and summer camp T-shirt.</p>
                </div>
              </div>
            </article>

            <article className="reg-card">
              <header>
                <span className="section-kicker">Already Registered?</span>
                <h2>Parent Portal &amp; Registration Lookup</h2>
                <p>Manage your reservation, update individual Scout rosters, and make installment payments online.</p>
              </header>
              <div className="parent-portal-content">
                <p>
                  Units and parents who have already started or completed a reservation can use Black Pug&apos;s official <strong>Parent Portal</strong> and <strong>Lookup Registration</strong> tools at any time. Simply open the council event page and select <em>Lookup → Parent Portal</em> or <em>Lookup Registration</em> in the navigation to view your reservation number, manage participant details, and make payments over time.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
                  <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                    Open Parent Portal on Black Pug ↗
                  </a>
                  <Link className="button button-secondary" href="/guide/packing-list">
                    Review Packing Checklist →
                  </Link>
                </div>
              </div>
            </article>
          </section>

          <aside className="registration-sidebar">
            <div className="sidebar-card highlight">
              <h3>Merit Badge Registration</h3>
              <p className="merit-badge-date">Opens February 1, 2027</p>
              <p>
                Class sizes are limited! Register early to secure your Scouts&apos; preferred classes.
              </p>
              <a className="button" href={MERIT_BADGE_CATALOG_URL} target="_blank" rel="noreferrer">
                Merit Badge Catalog (OneDrive) ↗
              </a>
              <Link className="text-link" href="/merit-badges">
                Browse Badge Library →
              </Link>
            </div>

            <div className="sidebar-card">
              <h3>Required Forms &amp; Attachments</h3>
              <ul className="sidebar-links">
                <li>
                  <a href={MEDICAL_FORM_URL} target="_blank" rel="noreferrer">
                    <strong>Medical Form (Parts A, B &amp; C) ↗</strong>
                    <small>Official Scouting America Annual Health Record</small>
                  </a>
                </li>
                <li>
                  <a href={MERIT_BADGE_CATALOG_URL} target="_blank" rel="noreferrer">
                    <strong>SBSA 2027 Merit Badge Catalog ↗</strong>
                    <small>Official program descriptions &amp; fees</small>
                  </a>
                </li>
                <li>
                  <Link href="/guide/packing-list">
                    <strong>Packing Checklist →</strong>
                    <small>Interactive packing &amp; paperwork guide</small>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Cancellation &amp; Refund Policy</h3>
              <ul className="policy-bullets">
                <li><strong>30+ Days Prior:</strong> 100% full refund.</li>
                <li><strong>Between 2 Weeks &amp; 30 Days:</strong> 50% refund.</li>
                <li><strong>Within 2 Weeks:</strong> Refund is at the discretion of the event coordinator or staff advisor (typically granted in emergency cases).</li>
              </ul>
              <p>See the official event page for the full policy and any event-specific exceptions.</p>
            </div>

            <div className="sidebar-card">
              <h3>Contact &amp; Questions</h3>
              <p>
                <strong>Camp Lawton / Catalina Council</strong><br />
                12900 E. Organization Ridge Rd<br />
                Tucson, Arizona 85619<br />
                Phone: <a href="tel:5207500385">520-750-0385</a>
              </p>
              <a className="button button-secondary" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                Open Black Pug Event Page ↗
              </a>
            </div>
          </aside>
        </div>
      </section>

      <p className="registration-source">Details checked September 26, 2026 against the <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">official Catalina Council event page</a>. Confirm current fees, availability, and policies there before registering.</p>

      <SiteFooter />
    </main>
  );
}
