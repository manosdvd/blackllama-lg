import { meritBadgeSurveyCatalog, type MeritBadgeSurveyItem } from "./merit-badge-survey.generated";

export type SurveyInterestPriority = "must-have" | "strong" | "nice-to-have";
export type StoredSurveyInterest = {
  offeringId: string;
  interestedCount: number;
  priority: SurveyInterestPriority;
  note: string | null;
};

export type PlanningSnapshot = {
  unit: { unitType: string; unitNumber: string; council: string; city: string; state: string; sessionId: string };
  attendance: { youthMale: number; youthFemale: number; youthOther: number; adultMale: number; adultFemale: number; adultOther: number };
  contacts: { primary?: { name?: string; email?: string; phone?: string }; alternate?: { name?: string; email?: string } };
  scouts: string[];
  interests: StoredSurveyInterest[];
  accommodationFollowUp: boolean;
  disclaimerVersion: string;
};

export type BadgeDemand = {
  badge: MeritBadgeSurveyItem;
  interestedCount: number;
  unitCount: number;
  priorityCounts: Record<SurveyInterestPriority, number>;
  sessionCounts: Record<string, number>;
  notes: { unit: string; sessionId: string; note: string }[];
};

const priorities = new Set<SurveyInterestPriority>(["must-have", "strong", "nice-to-have"]);

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function text(value: unknown, max = 250): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function boundedCount(value: unknown, max: number): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.max(0, Math.min(max, Math.floor(numeric))) : 0;
}

export function normalizeSurveyInterests(input: unknown, youthTotal: number): StoredSurveyInterest[] {
  const raw = record(input);
  const maximum = Math.max(0, Math.min(250, Math.floor(youthTotal)));
  return meritBadgeSurveyCatalog.flatMap((badge) => {
    const item = record(raw[badge.id]);
    const interestedCount = boundedCount(item.count, maximum);
    if (!interestedCount) return [];
    const requestedPriority = text(item.priority, 20) as SurveyInterestPriority;
    return [{
      offeringId: badge.id,
      interestedCount,
      priority: priorities.has(requestedPriority) ? requestedPriority : "nice-to-have",
      note: text(item.note, 250) || null,
    }];
  });
}

function snapshotCount(source: Record<string, unknown>, key: string): number {
  return boundedCount(source[key], 250);
}

export function parsePlanningSnapshot(value: string): PlanningSnapshot | null {
  try {
    const parsed = record(JSON.parse(value));
    const unit = record(parsed.unit);
    const attendance = record(parsed.attendance);
    const unitType = text(unit.unitType, 30), unitNumber = text(unit.unitNumber, 30), sessionId = text(unit.sessionId, 40);
    if (!unitType || !unitNumber || !sessionId) return null;
    const rawInterests = Array.isArray(parsed.interests) ? parsed.interests : [];
    const validIds = new Set(meritBadgeSurveyCatalog.map((badge) => badge.id));
    const interests = rawInterests.flatMap((value): StoredSurveyInterest[] => {
      const item = record(value);
      const offeringId = text(item.offeringId, 100);
      const interestedCount = boundedCount(item.interestedCount, 250);
      if (!validIds.has(offeringId) || !interestedCount) return [];
      const requestedPriority = text(item.priority, 20) as SurveyInterestPriority;
      return [{
        offeringId,
        interestedCount,
        priority: priorities.has(requestedPriority) ? requestedPriority : "nice-to-have",
        note: text(item.note, 250) || null,
      }];
    });
    const contacts = record(parsed.contacts), primary = record(contacts.primary), alternate = record(contacts.alternate);
    return {
      unit: {
        unitType,
        unitNumber,
        council: text(unit.council, 100),
        city: text(unit.city, 80),
        state: text(unit.state, 2),
        sessionId,
      },
      attendance: {
        youthMale: snapshotCount(attendance, "youthMale"),
        youthFemale: snapshotCount(attendance, "youthFemale"),
        youthOther: snapshotCount(attendance, "youthOther"),
        adultMale: snapshotCount(attendance, "adultMale"),
        adultFemale: snapshotCount(attendance, "adultFemale"),
        adultOther: snapshotCount(attendance, "adultOther"),
      },
      contacts: {
        primary: { name: text(primary.name, 100), email: text(primary.email, 200), phone: text(primary.phone, 40) },
        alternate: { name: text(alternate.name, 100), email: text(alternate.email, 200) },
      },
      scouts: Array.isArray(parsed.scouts) ? parsed.scouts.slice(0, 250).map((name) => text(name, 80)).filter(Boolean) : [],
      interests,
      accommodationFollowUp: parsed.accommodationFollowUp === true,
      disclaimerVersion: text(parsed.disclaimerVersion, 80) || "legacy",
    };
  } catch {
    return null;
  }
}

export function aggregateBadgeDemand(snapshots: PlanningSnapshot[]): BadgeDemand[] {
  return meritBadgeSurveyCatalog.map((badge): BadgeDemand => {
    const matches = snapshots.flatMap((snapshot) => {
      const interest = snapshot.interests.find((item) => item.offeringId === badge.id);
      return interest ? [{ snapshot, interest }] : [];
    });
    return {
      badge,
      interestedCount: matches.reduce((total, match) => total + match.interest.interestedCount, 0),
      unitCount: matches.length,
      priorityCounts: {
        "must-have": matches.filter((match) => match.interest.priority === "must-have").length,
        strong: matches.filter((match) => match.interest.priority === "strong").length,
        "nice-to-have": matches.filter((match) => match.interest.priority === "nice-to-have").length,
      },
      sessionCounts: matches.reduce<Record<string, number>>((counts, match) => {
        counts[match.snapshot.unit.sessionId] = (counts[match.snapshot.unit.sessionId] ?? 0) + match.interest.interestedCount;
        return counts;
      }, {}),
      notes: matches.flatMap((match) => match.interest.note ? [{
        unit: `${match.snapshot.unit.unitType} ${match.snapshot.unit.unitNumber}`,
        sessionId: match.snapshot.unit.sessionId,
        note: match.interest.note,
      }] : []),
    };
  }).filter((demand) => demand.interestedCount > 0).sort((a, b) => b.interestedCount - a.interestedCount || a.badge.title.localeCompare(b.badge.title));
}
