// Verified against the live Catalina Council event page on September 26, 2026.
export const OFFICIAL_REGISTRATION_URL = "https://scoutingevent.com/011-ScoutCamp2027";
export const WEEK1_REGISTRATION_URL = "https://scoutingevent.com/011-116731-272748";
export const WEEK2_REGISTRATION_URL = "https://scoutingevent.com/011-116731-272749";
export const MERIT_BADGE_CATALOG_URL = "https://1drv.ms/w/c/6d737b217ad523c0/IQB2ga1luoQQSJ4c4WdIL9O_AbtphBH2cBMBzctNXCaGVI4?e=92uqlH";
export const MEDICAL_FORM_URL = "https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_ABC.pdf";
export const REGISTRATION_REVIEWED_AT = new Date("2026-09-26T00:00:00Z");

export const registrationSessions = [
  { id: "bsa-week-1", name: "Scouts BSA Summer Camp Week 1", shortName: "Week 1", program: "bsa", dates: "June 6–12, 2027", arrival: "Sunday, 2:00 PM MST", departure: "Saturday by 10:00 AM MST", note: "Limited to 150 youth participants", registrationCloses: "May 23, 2027 at 11:59 PM MST", url: WEEK1_REGISTRATION_URL },
  { id: "bsa-week-2", name: "Scouts BSA Summer Camp Week 2", shortName: "Week 2", program: "bsa", dates: "June 13–19, 2027", arrival: "Sunday, 2:00 PM MST", departure: "Saturday by 10:00 AM MST", note: "Limited to 150 youth participants", registrationCloses: "May 30, 2027 at 11:59 PM MST", url: WEEK2_REGISTRATION_URL },
] as const;
