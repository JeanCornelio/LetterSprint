export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestInitialState {
  time: number;
  mode: string;
  words: number;
  puntuation: boolean; // true or false
  number: boolean; // true or false
  difficulty: Difficulty;
}
