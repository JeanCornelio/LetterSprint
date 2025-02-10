import { useEffect, useRef, useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import { useLoading } from "../../hooks/useLoading";
import { LoadingIcon, ReloadIcon } from "../../icons/Icons";
import {
  CORRECT_SOUND,
  ERROR_SOUND,
  MODES,
  TIME_OVER,
  TIMER,
} from "../../constants";

import { useTestConfiguration } from "../../hooks/useTestConfiguration";
import { TestConfiguration } from "../../components";
import { TestResult } from "../../components/TestResult";
import { Tooltip } from "../../components/Tooltip";
import { getTest } from "../../service/generateTest";
import { useAuth } from "../../hooks/useAuth";

interface Letters {
  letter: string;
  state: string;
  id: string;
}
interface Result {
  raw: number;
  wpm: number;
  precision: number;
  totalWords: number;
  characters: string;
}

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
  // Agregar más estados si es necesario
};



const letterStates = {
  incorrect: [],
  correct: [],
  extra: [],
  missed: [],
  incorrectRepeted: [],
  correctRepeted: [],
  extraRepeted: [],

};

interface states {
  incorrect: Letters[];
  correct: Letters[];
  extra: Letters[];
  missed: Letters[];
  incorrectRepeted: Letters[];
  correctRepeted: Letters[];
  extraRepeted: Letters[];
}


export const WritingTestPage = () => {

  const [wordPosition, setWordPosition] = useState(0);
  const [letterPosition, setLetterPosition] = useState(0);
  const [test, setTest] = useState<Word[]>([]);
  const [lettersStates, setLettersStates] = useState<states>(letterStates);
  const [originalTest, setOriginalTest] = useState<Word[]>([]);
  const [originalTotalWordsTest, setOriginalTotalWordsTest] = useState(0);
  const [testResult, setTestResult] = useState<Result | null>(null);
  const { loading, handleLoading } = useLoading();
  const { uid } = useAuth()
  const {
    seconds,
    handleTimerState,
    timerState,
    handleTimerTime,
    timeSelected,
  } = useTimer();
  const { mode, words: wordSelected, puntuation, number } = useTestConfiguration();
  const testContent = useRef(null);
  const { incorrectRepeted, correctRepeted, correct, incorrect, } = lettersStates;



  const createTest = () => {
    handleLoading(true); // Loanding
    const words: Word[] = getTest({ puntuation, number, wordSelected, mode, timeSelected });
    //words of the tets
    setTest(words);
    setOriginalTest(words);
    //Unreal timen to create a delay to 2 seg
    setTimeout(() => {
      handleLoading(false);
    }, 1000);
  };

  useEffect(() => {
    //Reset TIMER and Create Game

    resestTest();
  }, [mode, wordSelected, timeSelected, puntuation, number]);

  const toCheckWordCorreclyCompleted = (word: Word) => {
    const lettersStates = word.letters.some(
      (letter) =>
        letter.state === LETTER_STATES.INCORRECT ||
        letter.state === LETTER_STATES.INCORRECT_ACTIVE ||
        letter.state === LETTER_STATES.EXTRA_INCORRECT ||
        letter.state === ""
    );

    return lettersStates ? "error typed" : "typed";
  };

  const goToNextWord = () => {
    setWordPosition((current) => current + 1);
  };
  const goToPreviouslyWord = () => {
    setWordPosition((current) => current - 1);
  };

  useEffect(() => {
    if (timerState !== TIMER["start"]) return;

    const handleMousemove = () => {
      handleTimerState(TIMER["pause"]);
    };

    document.addEventListener("mouseover", handleMousemove);

    return () => document.removeEventListener("mouseover", handleMousemove);
  }, [timerState, handleTimerState]);

  const playCorrect = () => {
    const clone = CORRECT_SOUND.cloneNode();
    clone.play();
  };
  const playError = () => {
    const clone = ERROR_SOUND.cloneNode();
    clone.play();
  };

  const rowPosition = (wordPosition: number) => {
    const contentChildren = Array.from(testContent.current.children).map(
      (child) => {
        return child.getBoundingClientRect().top;
      }
    );

    const rowsGroups = Object.groupBy(contentChildren, (row) => row);
    const totalOfRows = Object.keys(rowsGroups).map((el) => {
      return rowsGroups[el];
    });

    const lettesLength = wordPosition + 1;

    if (totalOfRows[0].length === lettesLength) {
      const newTest = test.slice(lettesLength);
      const totalDeleted = newTest.length - originalTest.length;

      setOriginalTotalWordsTest(totalDeleted * -1);

      setTest(newTest);

      setWordPosition(0);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    //Start Game

    const { code, key } = event;

    const currentWord: Word = test[wordPosition];

    const currentLetters: Letters[] = currentWord.letters;

    //total of words nad total of letters to completed
    const totalWordsToCopleted = wordPosition + 1;
    const lastLettersToCompleted = letterPosition;

    if (key.length === 1 && code !== "Space") {
      handleTimerState(TIMER["start"]);
    }

    if (code === "Space") {
      //next Word State
      const nextWord = test[wordPosition + 1];

      if (letterPosition > 0 && nextWord) {
        //Reset Letter position
        setLetterPosition(0);

        //Go to next word
        goToNextWord();

        currentWord.state = toCheckWordCorreclyCompleted(currentWord);

        currentWord.state === "typed" ? playCorrect() : playError();

        nextWord.state = LETTER_STATES.ACTIVE;

        rowPosition(wordPosition);
      }

      setLettersStates((current) => {
        const updatedMissed = current.missed.filter((missedLetter) => {
          return !currentWord.letters.some(
            (currentLetter) =>
              currentLetter.id === missedLetter.id && currentLetter.state !== ""
          );
        });

        const newMissedLetters = currentWord.letters.filter(
          (letter) =>
            letter.state === "" &&
            !updatedMissed.some((missed) => missed.id === letter.id)
        );

        return {
          ...current,
          missed: [...updatedMissed, ...newMissedLetters],
        };
      });

      if (totalWordsToCopleted === test.length && lastLettersToCompleted > 0) {
        //Result of test
        getTetsResult();
      }
      return;
    }

    const updateLetter = currentLetters.map((letter: Letters, index) => {
      if (index === letterPosition && key.length === 1) {
        let letterWithNewState = {};

        if (letter.letter === key) {
          letterWithNewState = { ...letter, state: LETTER_STATES.CORRECT };
          handleResultLetterState(
            LETTER_STATES.CORRECT,
            letterWithNewState as Letters
          );

          return letterWithNewState;
        }

        if (letter.letter !== key) {
          letterWithNewState = { ...letter, state: LETTER_STATES.INCORRECT };
          handleResultLetterState(
            LETTER_STATES.INCORRECT,
            letterWithNewState as Letters
          );

          return letterWithNewState;
        }
      }

      if (index === letterPosition - 1 && key === "Backspace") {
        return { ...letter, state: "" };
      }

      return letter;
    });

    // write a next word and validations
    if (key.length === 1 && letterPosition < 19) {
      //Push new extra incorrects words

      if (letterPosition > currentWord.word.length - 1) {
        const extraLetter = {
          letter: key,
          state: LETTER_STATES.EXTRA_INCORRECT,
          id: `${key}-${crypto.randomUUID()}`,
        };

        handleResultLetterState("extra", extraLetter as Letters);
        updateLetter.push(extraLetter);
      }

      //next letter
      setLetterPosition((current) => current + 1);
    }

    const updateWords: Word = { ...currentWord, letters: updateLetter } as Word;

    const updateTest = [...test];

    updateTest[wordPosition] = updateWords;

    setTest(updateTest);

    if (key === "Backspace") {
      const previouslyWord = test[wordPosition - 1];

      if (letterPosition > currentWord.word.length) {
        updateLetter.pop();

        setLettersStates((current) => {

          const newExtraLetters = current['extra']

          newExtraLetters.pop()

          return { ...current, ['extra']: newExtraLetters };

        });
      }

      // erease if the user wrote a word
      if (letterPosition > 0) {
        // Removes the active state of the current letter before moving the cursor back
        currentWord.letters[letterPosition - 1].state = "";
        // move to back position
        setLetterPosition((current) => current - 1);

        return;
      }

      // validate if user made mistake writting a word
      if (
        wordPosition > 0 &&
        letterPosition === 0 &&
        previouslyWord.state === "error typed"
      ) {
        goToPreviouslyWord();

        // Move the letter position to the length of the previous words that were written
        const PreviouslyLetterPosition = previouslyWord.letters.filter(
          (letter) => letter.state !== ""
        ).length;

        setLetterPosition(PreviouslyLetterPosition);
        // Remove the error state and activate the previous word
        previouslyWord.state = LETTER_STATES.ACTIVE;
        currentWord.state = "";

        setTest([...test]);
      }
    }
  };

  const handleResultLetterState = (property: string, letter: Letters) => {
    setLettersStates((current) => {

      const letterExist = current[property].find((lett) => lett.id === letter.id)

      if (letterExist) {
        const repetedProperty = `${property}Repeted`

        return { ...current, [repetedProperty]: [...current[repetedProperty], letter] };
      }

      return { ...current, [property]: [...current[property], letter] };

    });
  };

  useEffect(() => {
    if (timerState === TIMER["finished"]) {
      document.removeEventListener("keydown", handleKeyDown);
      return;
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [test, wordPosition, seconds, timerState]);

  useEffect(() => {
    if (seconds === 0 && test.length > 0 && mode === MODES["time"]) {
      //reset All and show modal, remove events , reset test and properties

      getTetsResult();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [seconds]);

  const resestTest = () => {
    handleTimerState(TIMER["reset"]);
    createTest();
    setWordPosition(0);
    setLetterPosition(0);
    setOriginalTotalWordsTest(0);
    setLettersStates(letterStates);
    setTestResult(null);
    handleTimerTime();
  };

  const getTetsResult = () => {
    TIME_OVER.play();
    handleLoading(true); // Loanding
    handleTimerState(TIMER["finished"]);

    const timeInMinutes =
      (mode === MODES["time"] ? timeSelected : seconds) / 60;

    const { correct, incorrect, extra, missed, incorrectRepeted,
      correctRepeted, extraRepeted } = lettersStates;

    //  console.log(lettersStates)

    const charactersWritten = correct.length;

    //console.log(charactersWritten)

    const erros = incorrect.length + extra.length;

    // WPM gross
    const grossWpm = charactersWritten / 5 / timeInMinutes;

    // WPM neto
    const netWpm = grossWpm - erros / (5 * timeInMinutes);

    //TotalTyped
    const totalTyped = correct.length + correctRepeted.length + incorrect.length + incorrectRepeted.length + extra.length + extraRepeted.length;

    // precision
    const precision = ((correctRepeted.length + correct.length) / totalTyped) * 100;

    //Validation
    const invalidWpm =
      (precision < 20 && netWpm > 100) ||
      missed.length > correct.length ||
      netWpm < 0;

    setTestResult({
      precision: parseFloat(precision.toFixed(2)),
      raw: !Number.isFinite(grossWpm) ? 0 : parseFloat(grossWpm.toFixed(2)),
      wpm: invalidWpm ? 0 : parseFloat(netWpm.toFixed(2)),
      totalWords: wordPosition + originalTotalWordsTest + 1,
      characters: `${correct.length}/${incorrect.length}/${extra.length}/${missed.length}`,
    });

    handleLoading(false); // stop Loanding
  };

  return (
    <section className="w-full ">
      <TestConfiguration />

      <div className=" flex flex-col justify-center  h-[90%] ">
        {loading ? (
          <div className="w-full flex justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <>
            {mode === MODES["time"] && (
              <h2
                className={
                  (timerState !== TIMER["start"]
                    ? "animate-fade-out invisible"
                    : "animate-fade-in") +
                  " text-center text-4xl mb-5 text-sprint-blue transition-all "
                }
              >
                {seconds}
              </h2>
            )}
            {mode === MODES["words"] && (
              <h2
                className={
                  (timerState !== TIMER["start"]
                    ? "animate-fade-out invisible"
                    : "animate-fade-in") +
                  " text-center text-4xl mb-5 text-sprint-blue transition-all"
                }
              >
                {`${wordPosition + originalTotalWordsTest + 1} / ${originalTest.length
                  }`}
              </h2>
            )}
            {
              timerState === TIMER["finished"] && testResult !== null ? ( //===> finished

                <TestResult
                  testReultValues={{
                    characters: testResult.characters,
                    wpm: testResult.wpm,
                    correct: correctRepeted.length + correct.length,
                    incorrect: incorrectRepeted.length + incorrect.length,
                    totalWords: testResult.totalWords,
                    modeResult:
                      mode === "time"
                        ? `${timeSelected} Seconds`
                        : `${wordSelected} Words`,
                    precision: testResult.precision,
                    raw: testResult.raw,
                    mode,
                    seconds,
                    uid
                  }}
                />
              ) : (
                <div
                  className="w-full flex flex-wrap animate-fade-in text-pretty content-start h-44  overflow-x-visible overflow-y-clip text-gray-600"
                  ref={testContent}
                >
                  {test.map(({ id, letters, state }) => (
                    <div
                      id="word"
                      key={id}
                      className={
                        " my-[.20em] md:my-[.25em] mx-[.1em] md:mx-[.3em] text-2xl md:text-4xl px-1 max-h-fit select-none " +
                        state
                      }
                    >
                      {letters.map(({ letter, state, id }) => (
                        <span key={id} id="key" className={state}>
                          {letter}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            <div className="flex justify-center mt-20">
              <button
                className="text-xl  text-white"
                onClick={() => resestTest()}
              >
                <Tooltip
                  label={
                    timerState === TIMER["finished"]
                      ? "Repeat test"
                      : "Restar test"
                  }
                >
                  <span className="text-white hover:text-sprint-blue transition font-semibold ">
                    <ReloadIcon />
                  </span>
                </Tooltip>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
