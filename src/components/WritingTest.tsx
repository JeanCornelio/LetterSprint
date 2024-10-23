import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLoading } from "../hooks/useLoading";
import { LoadingIcon, ReloadIcon } from "../icons/Icons";
import { CORRECT_SOUND, ERROR_SOUND, MODES, TIME_OVER, TIMER} from "../constants";
import { Tooltip } from "./Tooltip";
import { Link } from "react-router-dom";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { TestConfiguration } from "./TestConfiguration";

interface Letters {
  letter: string;
  state: string;
  id: string;
}
interface Result {
  accuracy: number;
  raw: number;
  netWpm: number;
  correct: number;
  incorrect: number;
  extra: number;
  missed: number;
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

const text =
  "Creating a paragraph flow of words that connect ideas seamlessly like a river moving steadily forward without pause conveying thoughts feelings or descriptions in a fluid manner where each element contributes to the whole forming a smooth structure that never halts for commas or periods Creating a paragraph flow of words that connect ideas seamlessly like a river moving steadily forward without pause conveying thoughts feelings or descriptions in a fluid manner where each element contributes to the whole forming a smooth structure that never halts for commas or periods Creating a paragraph flow of words that connect ideas seamlessly like a river moving steadily forward without pause conveying thoughts feelings or descriptions in a fluid manner where each element contributes to the whole forming a smooth structure that never halts for commas or periods Creating a paragraph flow of words that connect ideas seamlessly like a river moving steadily forward without pause conveying thoughts feelings or descriptions in a fluid manner where each element contributes to the whole forming a smooth structure that never halts for commas or periods "; // ;

const result: Result = {
  accuracy: 0,
  raw: 0,
  correct: 0,
  incorrect: 0,
  extra: 0,
  missed: 0,
  netWpm: 0,
};

export const WritingTest = () => {
  const [wordPosition, setWordPosition] = useState(0);
  const [letterPosition, setLetterPosition] = useState(0);

  const [test, setTest] = useState<Word[]>([]);
  const [lettersError, setLettersError] = useState<Letters[]>([]);
  const [testResult, setTestResult] = useState<Result>(result);
  const { loading, handleLoading } = useLoading();
  const {
    seconds,
    handleTimerState,
    timerState,
    handleTimerTime,
    timeSelected,
  } = useTimer();
  const { mode, words: wordSelected } = useTestConfiguration();
  const testContent = useRef(null);
  const { accuracy, correct, incorrect, extra, missed, netWpm } = testResult;
  

  const createTest = () => {
    handleLoading(true); // Loanding
    //.slice(0, WORDS[wordSelected]) test
    const words: Word[] = text.split(" ").map((word, index) => {
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

    //words of the tets
    setTest(words);

    //Unreal timen to create a delay to 2 seg
    setTimeout(() => {
      handleLoading(false);
    }, 1000);
  };

  useEffect(() => {
    //Reset TIMER and Create Game
    resestTest();
  }, [mode, wordSelected, timeSelected]);

  const toCheckWordCorreclyCompleted = (word: Word) => {
    const lettersError = word.letters.some(
      (letter) =>
        letter.state === LETTER_STATES.INCORRECT ||
        letter.state === LETTER_STATES.INCORRECT_ACTIVE ||
        letter.state === LETTER_STATES.EXTRA_INCORRECT ||
        letter.state === ""
    );

    return lettersError ? "error typed" : "typed";
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

  const playCorrect =() =>{
    const clone = CORRECT_SOUND.cloneNode(); 
    clone.play();
  }
  const playError =() =>{
    const clone = ERROR_SOUND.cloneNode();
    clone.play(); 
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    //Start Game
    handleTimerState(TIMER["start"]);

    
   

    const { code, key } = event;

    const currentWord: Word = test[wordPosition];

    const currentLetters: Letters[] = currentWord.letters;

    //total of words nad total of letters to completed
    const totalWordsToCopleted = wordPosition + 1;
    const lastLettersToCompleted = letterPosition;

    if (
      totalWordsToCopleted === test.length &&
      currentLetters.length === lastLettersToCompleted
    ) {
      //Result of test
      getTetsResult();
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

        currentWord.state === 'typed' ?  playCorrect() : playError()

        console.log(currentWord.state)
        nextWord.state = LETTER_STATES.ACTIVE;
      }

      return;
    }

    const updateLetter = currentLetters.map((letter: Letters, index) => {
      if (index === letterPosition && key.length === 1) {

       
        if (letter.letter === key) {
          return {
            ...letter,
            state: LETTER_STATES.CORRECT,
          };
        }

        if (letter.letter !== key) {
          setLettersError((current) => [...current, letter]);
          return {
            ...letter,
            state: LETTER_STATES.INCORRECT,
          };
        }
      }

      if (index === letterPosition - 1 && key === "Backspace") {
        return {
          ...letter,
          state: LETTER_STATES.MISSED,
        };
      }

      return letter;
    });

    // write a next word and validations
    if (key.length === 1 && letterPosition < 19) {
      //Push new extra incorrects words
      if (letterPosition > currentWord.word.length - 1) {
        updateLetter.push({
          letter: key,
          state: LETTER_STATES.EXTRA_INCORRECT,
          id: `${key}-${crypto.randomUUID()}`,
        });
      }
      //next letter
      setLetterPosition((current) => current + 1);
    }

    const updateWords = { ...currentWord, letters: updateLetter };

    const updateTest = [...test];

    updateTest[wordPosition] = updateWords;

    setTest(updateTest);

    if (key === "Backspace") {
      const previouslyWord = test[wordPosition - 1];

      if (letterPosition > currentWord.word.length) {
        updateLetter.pop();
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
      TIME_OVER.play()
      getTetsResult();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [seconds]);

  const resestTest = () => {
    handleTimerState(TIMER["reset"]);
    createTest();
    setWordPosition(0);
    setLetterPosition(0);
    setLettersError([])
    handleTimerTime();
  };

  const getTetsResult = () => {
    handleLoading(true); // Loanding
    handleTimerState(TIMER["finished"]);

    const timeInMinutes = mode === MODES["time"] ? timeSelected : seconds / 60;

    const testCopy = structuredClone(test);

    const words = { correct: 0, incorrect: 0, missed: 0, extra: 0 };

    testCopy.forEach((word) => {
      word.letters.forEach((letter) => {
        if (letter.state === LETTER_STATES.CORRECT) {
          words.correct += 1;
        }
        if (letter.state === LETTER_STATES.EXTRA_INCORRECT) {
          words.extra += 1;
        }

        if (letter.state === "") {
          words.missed += 1;
        }
      });
    });
    //NOTA DE POSIBLE SOLUCION  PUSHEAR LA CANTIDAD DE DE PALABRAS ESCRITAS, CORRECTAS Y CUANTAS PALABRAS ESCRIBIO EL USUARIO
    words.incorrect = lettersError.length;

    const { correct, incorrect, extra, missed } = words;

    const totalWords = correct + incorrect;

    const accuracy = (correct / totalWords) * 100;

    // WPM gross
    const grossWpm = totalWords / 5 / timeInMinutes;

    // WPM neto
    const netWpm = grossWpm - extra / timeInMinutes;

    setTestResult({
      accuracy: Number(accuracy.toFixed(2)),
      raw: grossWpm,
      netWpm: netWpm < 0 ? 0 : netWpm,
      correct,
      incorrect,
      extra,
      missed,
    });
    handleLoading(false); // stop Loanding
  };

  return (
    <section className="w-full">
      <TestConfiguration />
      <div className=" flex flex-col justify-center  h-[90%]">
        {mode === MODES["time"] ? (
          <h2
            className={
              (timerState !== TIMER["start"]
                ? "animate-fade-out"
                : "animate-fade-in") +
              " text-center text-4xl mb-5 text-sprint-blue transition-all "
            }
          >
            {seconds}
          </h2>
        ) : (
          <h2
            className={
              (timerState !== TIMER["start"]
                ? "animate-fade-out"
                : "animate-fade-in") +
              " text-center text-4xl mb-5 text-sprint-blue transition-all"
            }
          >
            {`${wordPosition} / ${test.length}`}
          </h2>
        )}

        {loading ? (
          <div className="w-full flex justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <>
            {timerState === TIMER["finished"] ? ( //===> finished
              testResult !== null && (
                <section id="result" className="animate-fade-in-bottom text-4xl">
                  <article className="w-full bg-sprint-blue size-96 ">
                    <h3>Chart</h3>
                  </article>
                  <footer>
                    <div className=" flex justify-between">
                      <div>
                        <label className=" text-lg">ACCURACY</label>
                        <Tooltip
                          label={`${parseFloat(
                            accuracy.toFixed(2)
                          )} % (${correct} correct / ${incorrect} incorrect)`}
                        >
                          <span className=" text-sprint-blue font-semibold">
                            {Math.trunc(accuracy)} %
                          </span>
                        </Tooltip>
                      </div>

                      <div>
                        <label className=" text-lg">WPM</label>

                        <Tooltip label={`${parseFloat(netWpm.toFixed(2))} WPN`}>
                          <span className=" text-sprint-blue font-semibold">
                            {Math.trunc(netWpm)} %
                          </span>
                        </Tooltip>
                      </div>

                      <div>
                        <label className=" text-lg">CHARACTERES</label>

                        <Tooltip label="correct, incorrect, extra, missed">
                          <span className=" text-sprint-blue font-semibold">
                            {correct}/{incorrect}/{extra}/{missed}
                          </span>
                        </Tooltip>
                      </div>

                      {/* <p> RAW: {testResult.raw} </p>  */}
                      <div>
                        <label className=" text-lg">TIME</label>

                        <span className=" block text-sprint-blue font-semibold">
                          {seconds !== 0 ? seconds : timeSelected}s
                        </span>
                      </div>
                    </div>
                    <div className="text-center self-center mt-10 text-lg">
                      <Link to="/login" className="underline">
                        Sing in
                      </Link>{" "}
                      <span> to save your result</span>
                    </div>
                  </footer>
                </section>
              )
            ) : (
              <div
                className=" w-full flex flex-wrap animate-fade-in text-pretty h-96 overflow-clip"
                ref={testContent}
              >
                {test.map(({ id, letters, state }) => (
                  <div
                    id="word"
                    key={id}
                    className={"my-[.25em] mx-[.3em] text-3xl px-1.5 " + state}
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
