export type Difficulty = 'easy' | 'medium' | 'hard';
export type Language = 'en' | 'es' | 'fr';

export interface Paragraph {
  id: string;
  text: string;
  language: Language;
  difficulty: Difficulty;
  tags: string[];
}
