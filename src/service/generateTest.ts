import { MODES } from "../constants";
import {} from "../types/Text";

interface Word {
  word: string;
  id: string;
  state: string;
  letters: Letters[];
}

const LETTER_STATES = {
  ACTIVE: "active",
  CORRECT: "correct",
  INCORRECT: "incorrect",
  INCORRECT_ACTIVE: "incorrect active",
  EXTRA_INCORRECT: "incorrect extra",
  MISSED: "",
};

let text: string =
  "Certainly! Here's a long paragraph filled with as many words as possible while maintaining coherence: In the vast and ever-expanding universe of human ??? knowledge, 7 where the intricacies of language intertwine with the complexities of science, 482 technology, philosophy, 92 history, and art, 10458 there exists an endless stream of information waiting to be explored, 6 analyzed, and 3592 understood. Every moment, across the globe, 853 countless individuals engage in the pursuit of wisdom, 1 driven by curiosity, 9264 ambition, necessity, 73 or sheer fascination with the 4021 unknown. From the dawn of civilization, 284 when early humans painted symbols on cave walls to communicate their experiences, 19 to the modern digital age, 9483 where vast amounts of data are transmitted instantaneously across continents, 57239 the means by which knowledge is acquired, 20 stored, and shared have undergone profound, 839 transformations. Consider, for instance, the realm of literature, 5 where thousands of years of storytelling, 2483 poetry, and philosophical treatises have shaped the way societies perceive morality, 3892 existence, and the human 26 condition. The written word, 3927 in its myriad forms, has served as a vessel for transmitting cultural heritage, 1 preserving historical events, 7382 and inspiring generations of  93741 thinkers, 38 writers, 529 and leaders. Meanwhile, in the realm of science, 93 breakthroughs in fields such as physics, 7592 chemistry, 6 biology, 124 and artificial intelligence, 2749 continue to push the boundaries of what humanity, 48 understands about the natural world, 938 the universe, 58 and even 74928 itself. The scientific method, 4 a structured approach to inquiry based on observation, 8374 experimentation, 1 and critical analysis, 923 has enabled discoveries that have revolutionized medicine, 2048 engineering, 18 and countless other, 7392 disciplines. Consider the medical advancements, 4 that have increased life expectancy, 58 eradicated diseases, 9372 and improved the quality of human life, 2391 innovations such as vaccines, 85 antibiotics, 5821 and surgical techniques, 48 have transformed healthcare, 7930 saving millions of 402 lives. Similarly, the rise of computational technology, 20 from the early days of mechanical calculators, 7 to the sophisticated artificial intelligence systems, 1938 of today, has reshaped industries, 573 economies, 32 and even personal interactions, 9831 redefining what it means to work, 9 learn, 85 and, 47382 communicate. However, as knowledge expands, 102 and technology evolves, 73829 so too do the ethical dilemmas, 49 and societal challenges, 572 that accompany, 1 progress. Issues related to privacy, 7392 digital security, 8 misinformation, 49283 and the implications of automation on employment, 10 present complex questions, 9371 that require careful consideration, 205 interdisciplinary dialogue, 73 and 9203 thoughtful policymaking. At the intersection of all these domains, 49 lies the human experience, 5 a dynamic and ever-changing journey, 8391 marked by innovation, 47 struggle, 593 creativity, 129 and 2018 adaptation. From the smallest individual choices, 8 to the grandest societal movements, 28 the pursuit of knowledge, 458 remains one of the most defining aspects of human civilization, 7381 an unending quest, 60 that continues to shape the world, 1 and the future 9472 of humanity itself. Certainly! Here's a long paragraph filled with as many words as possible while maintaining coherence: In the vast and ever-expanding universe of human knowledge, 7 where the intricacies of language intertwine with the complexities of science, 482 technology, philosophy, 92 history, and art, 10458 there exists an endless stream of information waiting to be explored, 6 analyzed, and 3592 understood. Every moment, across the globe, 853 countless individuals engage in the pursuit of wisdom, 1 driven by curiosity, 9264 ambition, necessity, 73 or sheer fascination with the 4021 unknown. From the dawn of civilization, 284 when early humans painted symbols on cave walls to communicate their experiences, 19 to the modern digital age, 9483 where vast amounts of data are transmitted instantaneously across continents, 57239 the means by which knowledge is acquired, 20 stored, and shared have undergone profound, 839 transformations. Consider, for instance, the realm of literature, 5 where thousands of years of storytelling, 2483 poetry, and philosophical treatises have shaped the way societies perceive morality, 3892 existence, and the human 26 condition. The written word, 3927 in its myriad forms, has served as a vessel for transmitting cultural heritage, 1 preserving historical events, 7382 and inspiring generations of  93741 thinkers, 38 writers, 529 and leaders. Meanwhile, in the realm of science, 93 breakthroughs in fields such as physics, 7592 chemistry, 6 biology, 124 and artificial intelligence, 2749 continue to push the boundaries of what humanity, 48 understands about the natural world, 938 the universe, 58 and even 74928 itself. The scientific method, 4 a structured approach to inquiry based on observation, 8374 experimentation, 1 and critical analysis, 923 has enabled discoveries that have revolutionized medicine, 2048 engineering, 18 and countless other, 7392 disciplines. Consider the medical advancements, 4 that have increased life expectancy, 58 eradicated diseases, 9372 and improved the quality of human life, 2391 innovations such as vaccines, 85 antibiotics, 5821 and surgical techniques, 48 have transformed healthcare, 7930 saving millions of 402 lives. Similarly, the rise of computational technology, 20 from the early days of mechanical calculators, 7 to the sophisticated artificial intelligence systems, 1938 of today, has reshaped industries, 573 economies, 32 and even personal interactions, 9831 redefining what it means to work, 9 learn, 85 and, 47382 communicate. However, as knowledge expands, 102 and technology evolves, 73829 so too do the ethical dilemmas, 49 and societal challenges, 572 that accompany, 1 progress. Issues related to privacy, 7392 digital security, 8 misinformation, 49283 and the implications of automation on employment, 10 present complex questions, 9371 that require careful consideration, 205 interdisciplinary dialogue, 73 and 9203 thoughtful policymaking. At the intersection of all these domains, 49 lies the human experience, 5 a dynamic and ever-changing journey, 8391 marked by innovation, 47 struggle, 593 creativity, 129 and 2018 adaptation. From the smallest individual choices, 8 to the grandest societal movements, 28 the pursuit of knowledge, 458 remains one of the most defining aspects of human civilization, 7381 an unending quest, 60 that continues to shape the world, 1 and the future 9472 of humanity itself.";

// Cortar el texto para siempre obtener textos diferentes

const createWordFormat = (text) => {
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

export const getTest = (config) => {
  const { mode, wordSelected, number, puntuation } = config;
  let modifiedText = text;

  if (!puntuation) {
    modifiedText = modifiedText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡""'<>[\]@+|]/g, "");
  }


  if (!number) {
    modifiedText = modifiedText.replace(/\s?\d+\s?/g, " "); 
  }

  // Eliminar espacios extra y convertir todo a minúsculas
  modifiedText = modifiedText.replace(/\s+/g, " ").trim().toLowerCase();


  let words = modifiedText.split(" ");

  const min = 50;
  const random = Math.floor(Math.random() * (500 - min) + 1) + min;
  
  words = words.slice(random);
  
  //console.log(random, words)

  if (mode === MODES.words) {
    words = words.slice(0, wordSelected);
  }


  return createWordFormat(words);
};
