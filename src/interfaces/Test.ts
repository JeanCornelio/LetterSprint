export interface Test {
  uid: string;
  wpm: number;
  raw: number;
  precision: number;
  characters: string;
  mode: string;
  modeSelected: string;
  date: string;
  userUid?: string;
}

export interface RecordItem {
  uid: string;
  modeSelected: string;
  wpm: number | null;
  precision: number | null;
  raw: number | null;
}

export interface Stats {
  testsCompleted: number;
  wordsWritten: number;
  timeTyping: number;
  timeRecord: RecordItem[];
  wordRecord: RecordItem[];
}