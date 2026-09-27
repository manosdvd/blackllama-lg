import { OFFICIAL_REGISTRATION_URL } from "../../../lib/registration";

// Keep old clients from sending participant data to a retired endpoint.
export async function POST() {
  return Response.json({
    error: "Register for Camp Lawton Summer Camp 2027 through the official council event page.",
    registrationUrl: OFFICIAL_REGISTRATION_URL,
  }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
