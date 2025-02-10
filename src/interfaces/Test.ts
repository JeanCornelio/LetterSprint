

export interface Test {
  uid: string,
    wpm: number,
    raw: number,
    precision: number,
    characters: string,
    mode: string,
    modeSelected: string,
    date: string
  }

  export interface Stats {
    testsCompleted: number,
    wordsWritten: number,
    timeTyping: number,
    timeRecord: [],
    wordRecord: []
  }