export type PackingOwner = "participant" | "unit";
export type PackingSectionKind = "core" | "optional" | "warning";

export type PackingItem = {
  id: string;
  label: string;
};

export type PackingSection = {
  id: string;
  title: string;
  owner: PackingOwner;
  kind: PackingSectionKind;
  items: PackingItem[];
  noteSource: string;
};

export type ParsedPackingList = {
  introSource: string;
  supplementalSource: string;
  sections: PackingSection[];
  recognizedGroupCount: number;
};

export type PackingSectionMetadata = {
  heading: string;
  id: string;
  owner: PackingOwner;
  kind: PackingSectionKind;
};

/**
 * These headings are the publishing contract for the interactive guide. Items
 * always come from the current article body, including staff-published edits.
 */
export const PACKING_SECTION_METADATA: readonly PackingSectionMetadata[] = [
  { heading: "Unit & Leader Check-In", id: "unit-leader-check-in", owner: "unit", kind: "core" },
  { heading: "Each Participant Should Bring", id: "participant-essentials", owner: "participant", kind: "core" },
  { heading: "Useful Optional Gear", id: "participant-optional", owner: "participant", kind: "optional" },
  { heading: "Leave at Home", id: "leave-at-home", owner: "participant", kind: "warning" },
] as const;

function plainText(value: string): string {
  return value
    .replace(/\[([^\]]+)]\((?:\/|https:\/\/)[^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedKey(value: string): string {
  return plainText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stablePackingItemId(sectionId: string, label: string): string {
  return `${sectionId}:${normalizedKey(label) || "item"}`;
}

export function parsePackingList(source: string): ParsedPackingList {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const metadata = new Map(PACKING_SECTION_METADATA.map((entry) => [normalizedKey(entry.heading), entry]));
  const sections: PackingSection[] = [];
  const introLines: string[] = [];
  const supplementalLines: string[] = [];
  let current: PackingSection | null = null;
  let foundRecognizedHeading = false;
  let recognizedGroupCount = 0;

  for (const line of lines) {
    const headingMatch = /^###\s+(.+?)\s*$/.exec(line.trim());
    if (headingMatch) {
      const definition = metadata.get(normalizedKey(headingMatch[1]));
      if (definition) {
        foundRecognizedHeading = true;
        recognizedGroupCount += 1;
        current = sections.find((section) => section.id === definition.id) ?? {
          id: definition.id,
          title: definition.heading,
          owner: definition.owner,
          kind: definition.kind,
          items: [],
          noteSource: "",
        };
        if (!sections.includes(current)) sections.push(current);
      } else {
        current = null;
        (foundRecognizedHeading ? supplementalLines : introLines).push(line);
      }
      continue;
    }

    if (/^#{1,6}\s+/.test(line.trim())) {
      current = null;
      (foundRecognizedHeading ? supplementalLines : introLines).push(line);
      continue;
    }

    const itemMatch = /^\s*-\s+(.+?)\s*$/.exec(line);
    if (current && itemMatch) {
      const label = plainText(itemMatch[1]);
      if (!label) continue;
      const id = stablePackingItemId(current.id, label);
      if (!current.items.some((item) => item.id === id)) current.items.push({ id, label });
      continue;
    }

    if (current) {
      if (line.trim()) current.noteSource = [current.noteSource, line.trim()].filter(Boolean).join("\n");
      continue;
    }

    (foundRecognizedHeading ? supplementalLines : introLines).push(line);
  }

  return {
    introSource: introLines.join("\n").trim(),
    supplementalSource: supplementalLines.join("\n").trim(),
    sections,
    recognizedGroupCount,
  };
}
