import { MODES } from "../constants";
import { paragraphs } from "../data/paragraphs";
import { Difficulty, TypingLanguage } from "../interfaces/testConfiguration";

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
  language?: TypingLanguage;
  timeSelected?: number;
}

const ALL_PUNCTUATION_AND_SYMBOLS_REGEX = /[^\p{L}\p{N}\s]/gu;

const getRandomParagraphText = (difficulty: Difficulty, language: TypingLanguage) => {
  const selectedLanguageParagraphs = paragraphs[language] ?? paragraphs.en;
  const filteredByDifficulty = selectedLanguageParagraphs.filter(
    (paragraph) => paragraph.difficulty === difficulty,
  );

  if (filteredByDifficulty.length === 0) {
    const fallbackParagraphs = paragraphs.en.filter(
      (paragraph) => paragraph.difficulty === difficulty,
    );
    const fallbackRandomIndex = Math.floor(Math.random() * fallbackParagraphs.length);
    return fallbackParagraphs[fallbackRandomIndex].text;
  }

  const randomIndex = Math.floor(Math.random() * filteredByDifficulty.length);

  return filteredByDifficulty[randomIndex].text;
};

const applyParagraphFilters = (text: string, puntuation: boolean, number: boolean, difficulty: Difficulty) => {
  let modifiedText = text;

  // PUNTUATION FILTER
  if (!puntuation) {
    // Remove every punctuation/symbol character, including %, - and +
    modifiedText = modifiedText.replace(ALL_PUNCTUATION_AND_SYMBOLS_REGEX, "");
  } else {
    // Keep signs based on difficulty
    if (difficulty === 'easy') {
      // Keep only . ! ? - remove , : ; ' " [ ] { }
      modifiedText = modifiedText.replace(/[,:;"'"\[\]{}]/g, "");
    } else if (difficulty === 'medium') {
      // Keep . , : ; ! ? ' - remove " [ ] { }
      modifiedText = modifiedText.replace(/["\[\]{}]/g, "");
    }
    // Hard keeps all punctuation
  }

  // NUMBER FILTER
  if (!number) {
    modifiedText = modifiedText.replace(/\d+/g, "");
  }

  return modifiedText.replace(/\s+/g, " ").trim().toLowerCase();
};

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
  const {
    mode,
    wordSelected,
    number,
    puntuation,
    difficulty = 'medium',
    language = 'en',
  } = config;

  let words = applyParagraphFilters(
    getRandomParagraphText(difficulty, language),
    puntuation,
    number,
    difficulty,
  ).split(" ");

  if (mode === MODES.words) {
    while (words.length < wordSelected) {
      const extraWords = applyParagraphFilters(
        getRandomParagraphText(difficulty, language),
        puntuation,
        number,
        difficulty,
      ).split(" ");

      words = [...words, ...extraWords];
    }

    words = words.slice(0, wordSelected);
  }

  return createWordFormat(words);
};
