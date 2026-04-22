import { MODES } from "../constants";
import { paragraphs } from "../data/paragraphs";
import { Difficulty } from "../interfaces/testConfiguration";

interface Word {
  word: string;
  id: string;
  state: string;
  letters: Letters[];
}

interface Letters {
  letter: string;
  state: string;
  id: string;
}

const LETTER_STATES = {
  ACTIVE: "active",
  CORRECT: "correct",
  INCORRECT: "incorrect",
  INCORRECT_ACTIVE: "incorrect active",
  EXTRA_INCORRECT: "incorrect extra",
  MISSED: "",
};

interface Config {
  mode: string;
  wordSelected: number;
  number: boolean;
  puntuation: boolean;
  difficulty?: Difficulty;
  timeSelected?: number;
}

const createWordFormat = (text: string[]) => {
  const words: Word[] = text.map((word, index) => {
    return {
      word,
      id: `${word}-${crypto.randomUUID()}`,
      state: index === 0 ? LETTER_STATES.ACTIVE : "",
      letters: word.split("").map((letter) => {
        return {
          letter: letter,
          state: "",
          id: `${letter}-${crypto.randomUUID()}`,
        };
      }),
    };
  });

  return words;
};

export const getTest = (config: Config) => {
  const { mode, wordSelected, number, puntuation, difficulty = 'medium' } = config;

  const filteredByDifficulty = paragraphs.en.filter(p => p.difficulty === difficulty);
  const randomIndex = Math.floor(Math.random() * filteredByDifficulty.length);
  let modifiedText = filteredByDifficulty[randomIndex].text;

  if (!puntuation) {
    modifiedText = modifiedText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡""'<>[\]@+|]/g, "");
  }

  if (!number) {
    modifiedText = modifiedText.replace(/\s?\d+\s?/g, " ");
  }

  modifiedText = modifiedText.replace(/\s+/g, " ").trim().toLowerCase();

  let words = modifiedText.split(" ");

  if (mode === MODES.words) {
    words = words.slice(0, wordSelected);
  }

  return createWordFormat(words);
};
