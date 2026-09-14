export interface SadhanaHistoryEntry {
  japa: number;
  meditation: number;
}

export interface SadhanaData {
  japaRounds: number;
  meditationMinutes: number;
  streak: number;
  lastLogDate: string;
  history: { [date: string]: SadhanaHistoryEntry };
}

export const DEFAULT_SADHANA_DATA: SadhanaData = {
  japaRounds: 0,
  meditationMinutes: 0,
  streak: 0,
  lastLogDate: "",
  history: {},
};
