import re

def extract_section(text, header):
    """Extract everything from a header until the next '---' or end of string."""
    pattern = re.compile(rf"({re.escape(header)}.*?)(?:\n---\n|\Z)", re.DOTALL)
    match = pattern.search(text)
    return match.group(1).strip() if match else ""

def extract_subsection(text, header):
    """Extract everything from a ## header until the next ## header or end of section."""
    pattern = re.compile(rf"({re.escape(header)}.*?)(?:\n## |\Z)", re.DOTALL)
    match = pattern.search(text)
    return match.group(1).strip() if match else ""

def format_body(content):
    # Escape backticks and format as a JS template string
    return "`" + content.replace('`', '\\`') + "`"

def main():
    with open('/home/manosdvd/blackllama-lg/2027leadersGuideAdvanced.md', 'r', encoding='utf-8') as f:
        md = f.read()

    # Base sections
    intro = extract_section(md, "# 2027 Camp Lawton Leader’s Guide")
    sec_I = extract_section(md, "# I. Welcome to Camp Lawton")
    sec_II = extract_section(md, "# II. Before You Arrive")
    sec_III = extract_section(md, "# III. Travel, Arrival, and Check-In")
    sec_IV = extract_section(md, "# IV. Campsites, Facilities, and Daily Life")
    sec_V = extract_section(md, "# V. Campwide Rules and Safeguarding Youth")
    sec_VI = extract_section(md, "# VI. Health, Weather, Emergencies, and Wildlife")
    sec_VII = extract_section(md, "# VII. Program Overview")
    sec_VIII = extract_section(md, "# VIII. Recognition and Service")
    sec_IX = extract_section(md, "# IX. Leader Operations")
    sec_X = extract_section(md, "# X. Departure and Check-Out")
    sec_XI = extract_section(md, "# XI. Frequently Asked Questions")
    sec_XII = extract_section(md, "# XII. Final Leader Checklist")

    # Mapping to bodies
    # 1. Arrival & Check-In
    arrival_body = sec_III.replace("# III. Travel, Arrival, and Check-In\n\n", "")

    # 2. Dates, Fees & Registration
    # Combine the table from intro and the existing text
    table_match = re.search(r"(\| Camp Information \|.*?\n(?:\|.*?\|\n)+)", intro, re.DOTALL)
    table = table_match.group(1) if table_match else ""
    dates_body = table + "\n\n## Registration boundary\n\nInterest forms on this site are non-binding planning tools. They do not reserve a campsite, register a participant, guarantee a merit badge seat, or collect payment. Official registration will be completed separately through Black Pug in spring."

    # 3. Packing List
    packing = extract_subsection(sec_II, "## Packing for Camp Lawton")
    packing_body = packing

    # 4. Camp Policies
    policies = "\n\n".join([
        extract_subsection(sec_V, "## Campwide Rules at a Glance"),
        extract_subsection(sec_V, "## Visitors and Camp Security"),
        extract_subsection(sec_V, "## Leaving Camp and Independent Activities"),
        extract_subsection(sec_V, "## Vehicles")
    ])
    policies_body = policies

    # 5. Health, Safety & Youth Protection
    health_safety = "\n\n".join([
        extract_subsection(sec_V, "## Safeguarding Youth"),
        extract_subsection(sec_VI, "## Camp Health Officer and Medications"),
        extract_subsection(sec_VI, "## Injuries and Illness"),
        extract_subsection(sec_VI, "## Campwide Emergency Signal"),
        extract_subsection(sec_VI, "## Missing Person"),
        extract_subsection(sec_VI, "## Active Threat")
    ])
    health_body = health_safety

    # 6. Daily Rhythm & Program
    rhythm_body = sec_VII.replace("# VII. Program Overview\n\n", "")

    # 7. Cub Weekend Program (Keep existing)
    cub_body = """## Program groups\n\nGroup A serves Tigers and Wolves, Group B serves Bears, and Group C serves Webelos and Arrow of Light Scouts. Activities share a theme while instruction and challenge level change by group.\n\n## Weekend shape\n\nFriday includes arrival, campsite setup, safety briefing, dinner, and staff campfire. Saturday is the full activity day. Sunday includes pack-up, closing recognition, and departure.\n\n## Climbing restriction\n\nThe climbing wall is limited to Group C, Webelos and Arrow of Light, with certified supervision. Tigers, Wolves, and Bears may not enter the climbing activity area."""

    # 8. Leader Logistics
    leader_body = sec_IX.replace("# IX. Leader Operations\n\n", "") + "\n\n" + sec_XII.replace("# XII. Final Leader Checklist\n\n", "")

    # 9. Fire, Weather & Wildlife
    fire_weather = "\n\n".join([
        extract_subsection(sec_VI, "## Altitude, Hydration, Heat, and Cold"),
        extract_subsection(sec_VI, "## Lightning and Severe Storms"),
        extract_subsection(sec_VI, "## Wildfire"),
        extract_subsection(sec_VI, "## Terrain, Trees, and Night Travel"),
        extract_subsection(sec_VI, "## Wildlife")
    ])
    fire_weather_body = fire_weather

    # 10. Departure Checklist
    departure_body = sec_X.replace("# X. Departure and Check-Out\n\n", "")

    # 11. Facilities & Campsites
    facilities_body = sec_IV.replace("# IV. Campsites, Facilities, and Daily Life\n\n", "")

    # 12. History & Camp Spirit
    history_body = sec_I.replace("# I. Welcome to Camp Lawton\n\n", "") + "\n\n" + sec_VIII.replace("# VIII. Recognition and Service\n\n", "")

    # 13. Frequently Asked Questions
    faq_body = sec_XI.replace("# XI. Frequently Asked Questions\n\n", "")


    # Update the lib/camp-catalog.ts file
    with open('/home/manosdvd/blackllama-lg/lib/camp-catalog.ts', 'r', encoding='utf-8') as f:
        catalog_ts = f.read()

    # Dictionary mapping slug to new body
    replacements = {
        "arrival-and-check-in": arrival_body,
        "dates-fees-and-registration": dates_body,
        "packing-list": packing_body,
        "camp-policies": policies_body,
        "health-safety-and-youth-protection": health_body,
        "daily-rhythm-and-program": rhythm_body,
        "cub-weekend-program": cub_body,
        "leader-logistics": leader_body,
        "fire-weather-and-wildlife": fire_weather_body,
        "departure-checklist": departure_body,
        "facilities-and-campsites": facilities_body,
        "history-and-camp-spirit": history_body,
        "frequently-asked-questions": faq_body
    }

    for slug, new_body in replacements.items():
        # Match from `slug: "slug"` to the next `body: \`...\`,` or `},`
        # Because we only want to replace the `body: ...` inside that specific object
        pattern = re.compile(rf'(slug:\s*"{slug}".*?body:\s*)`.*?`', re.DOTALL)
        
        # Test if pattern matches
        if not pattern.search(catalog_ts):
            print(f"Could not find body for slug: {slug}")
        else:
            catalog_ts = pattern.sub(rf'\g<1>{format_body(new_body)}', catalog_ts)

    with open('/home/manosdvd/blackllama-lg/lib/camp-catalog.ts', 'w', encoding='utf-8') as f:
        f.write(catalog_ts)
        
    print("Updated lib/camp-catalog.ts successfully.")

if __name__ == "__main__":
    main()
