export type Difficulty = 'easy' | 'medium' | 'hard';
export type TypingLanguage = 'en' | 'es';

export interface TestInitialState {
  time: number;
  mode: string;
  words: number;
  puntuation: boolean; // true or false
  number: boolean; // true or false
  soundEffects: boolean;
  difficulty: Difficulty;
  language: TypingLanguage;
}
