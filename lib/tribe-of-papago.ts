export type TribeRank = {
  id: string;
  title: string;
  stage: string;
  requirements: string[];
};

export type TribeProgram = {
  introduction: string;
  ranks: TribeRank[];
  barkerRequirements: string[];
};

function clean(value: string): string {
  return value.replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
}

function idFor(value: string): string {
  return clean(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isTribeHeading(value: string): boolean {
  return /^the tribe of papago$/i.test(clean(value));
}

export function parseTribeProgram(source: string): TribeProgram {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const ranks: TribeRank[] = [];
  const barkerRequirements: string[] = [];
  const intro: string[] = [];
  let inTribe = false;
  let inBarker = false;
  let current: TribeRank | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) {
      const heading = clean(h2[1]);
      if (isTribeHeading(heading)) {
        inTribe = true;
        inBarker = false;
        current = null;
      } else if (/^the barker standard$/i.test(heading)) {
        inTribe = false;
        inBarker = true;
        current = null;
      } else {
        inTribe = false;
        inBarker = false;
        current = null;
      }
      continue;
    }
    if (h3) {
      if (inTribe) {
        const title = clean(h3[1]);
        current = { id: idFor(title), title, stage: title.includes("—") ? title.split("—").slice(1).join("—").trim() : "Camp recognition", requirements: [] };
        ranks.push(current);
      }
      continue;
    }
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (bullet && current && inTribe) current.requirements.push(clean(bullet[1]));
    else if (numbered && inBarker) barkerRequirements.push(clean(numbered[1]));
    else if (inTribe && !current && line) intro.push(clean(line));
  }

  return { introduction: intro.join(" "), ranks, barkerRequirements };
}
