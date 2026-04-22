export type Language = 'en' | 'es' | 'fr';

export interface Paragraph {
  id: string;
  text: string;
  language: Language;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}
