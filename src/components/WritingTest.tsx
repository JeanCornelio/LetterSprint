import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLoading } from "../hooks/useLoading";
import { LoadingIcon, ReloadIcon } from "../icons/Icons";
import { TIMER } from "../constants";

const text =
  "Creating a paragraph without punctuation involves continuous flow of words that connect ideas seamlessly like a river moving steadily forward without pause conveying thoughts feelings or descriptions in a fluid manner where each element contributes to the whole forming a smooth structure that never halts for commas or periods";

interface Letters {
  letter: string;
  state: string;
  id: string;
}

interface Word {
  word: string;
  id: string;
  state: string;
  letters: Letters[];
}

export const WritingTest = () => {
  const [wordPosition, setWordPosition] = useState(0);
  const letterPosition = useRef(0);
  const [test, setTest] = useState<Word[]>([]);
  const [testResult, setTestResult] = useState(null);
  const { loading, handleLoading } = useLoading();
  const { seconds, handleTimerState, timerState, handleTimerTime } = useTimer();
  const testContent = useRef(null);




  const createTest = () => {
    handleLoading(true); // Loanding
    const words: Word[] = text.split(" ").map((word, index) => {
      return {
        word,
        id: `${word}-${crypto.randomUUID()}`,
        state: index === 0 ? "active" : "",
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
    createTest();
  }, []);

  const toCheckWordCorreclyCompleted = (word: Word) => {
    const lettersError = word.letters.some(
      (letter) =>
        letter.state === "incorrect" ||
        letter.state === "incorrect active" ||
        letter.state === "incorrect extra" ||
        letter.state === ""
    );

    return lettersError ? "error typed" : "typed";
  };

  const goToNextWord = () => {
    setWordPosition((current) => current + 1);
  }
  const goToPreviouslyWord = () => {
    setWordPosition((current) => current - 1);
  }

  const resestTest = () => {
    //get New test
    //createTest();
    setWordPosition(0);
    letterPosition.current = 0;
    //handleTimerTime();
  };



  useEffect(() => {
    const handleMousemove = () => {
      handleTimerState(TIMER["pause"]);
    };

    document.addEventListener("mousemove", handleMousemove);

    return () => document.removeEventListener("mousemove", handleMousemove);
  }, []);




  useEffect(() => {

    const handleKeyDown = (event: React.KeyboardEvent) => {

      //Start Game
      handleTimerState(TIMER["start"]);

      const { code, key } = event;

      const currentWord: Word = test[wordPosition];


      // Las letras de la palabra activa
      const currentLetters: Letters[] = currentWord.letters;

      //total of words nad total of letters to completed 
      const totalWordsToCopleted = wordPosition + 1
      const lastLettersToCompleted = letterPosition.current + 1

      if (totalWordsToCopleted === test.length && currentLetters.length === lastLettersToCompleted) {
        //Result of test
        getTetsResult()
      }



      if (code === "Space") {

        //next Word State
        const nextWord = test[wordPosition + 1]

        if (letterPosition.current > 0) {
          //Reset Letter position
          letterPosition.current = 0;

          //Go to next word
          goToNextWord()

          currentWord.state = toCheckWordCorreclyCompleted(currentWord);
          nextWord.state = "active";
        }

        return;
      }

      const updateLetter = currentLetters.map((letter: Letters, index) => {
        if (index === letterPosition.current && key.length === 1) {
          //correcta o incorrecta
          return {
            ...letter,
            state: letter.letter === key ? "correct" : "incorrect",
          };
        }

        if (index === letterPosition.current - 1 && key === "Backspace") {
          return {
            ...letter,
            state:
              letter.state === "incorrect" || letter.state === "correct"
                ? ""
                : letter.state,
          };
        }

        return letter;
      });




      // write a next word and validations
      if (key.length === 1 && letterPosition.current < 19) {

        //Push new extra incorrects words 
        if (letterPosition.current > currentWord.word.length - 1) {

          updateLetter.push({
            letter: key,
            state: "incorrect extra",
            id: `${key}-${crypto.randomUUID()}`,
          });
        }

        //next letter
        letterPosition.current += 1;
      }



      const updateWords = { ...currentWord, letters: updateLetter };

      const updateTest = [...test];

      updateTest[wordPosition] = updateWords;

      setTest(updateTest);


      if (key === "Backspace") {

        const previouslyWord = test[wordPosition - 1]

        if (letterPosition.current > currentWord.word.length) {
          updateLetter.pop();
        }

        // erease if the user wrote a word
        if (letterPosition.current > 0) {
          // Removes the active state of the current letter before moving the cursor back
          currentWord.letters[letterPosition.current - 1].state = "";
          console.log(currentWord, test[wordPosition])
          // move to back position 
          letterPosition.current -= 1;

          return
        }


        // validate if user made mistake writting a word
        if (wordPosition > 0 && letterPosition.current === 0 && previouslyWord.state === "error typed") {

          goToPreviouslyWord()

          // Move the letter position to the length of the previous words that were written
          const PreviouslyLetterPosition = previouslyWord.letters.filter(letter => letter.state !== '').length;

          letterPosition.current = PreviouslyLetterPosition


          // Remove the error state and activate the previous word
          previouslyWord.state = "active";
          currentWord.state = "";

          setTest([...test]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [test, wordPosition]);

  useEffect(() => {

    if (seconds === 0 && test.length > 0) {
      //reset All and show modal, remove events , reset test and properties
      handleTimerState(TIMER["stop"]);
      getTetsResult()
      setTimeout(resestTest, 200);
    }
  }, [seconds, test]);


  const getTetsResult = () => {
    console.log('get Results of test')


    setTestResult("finish")

  }

  return (
    <section className="mt-8  px-5">
      <h2
        className={
          (timerState !== TIMER["start"] ? "invisible" : "") +
          " text-center text-4xl mb-5 text-sprint-blue transition-all"
        }
      >
        {seconds}
      </h2>

      {loading ? (
        <div className="w-full flex justify-center mt-14 ">
          <LoadingIcon />
        </div>
      ) : (
        <>
          <div className=" w-full flex flex-wrap     text-pretty" ref={testContent}>
            {test.map(({ id, letters, state }) => (
              <div
                id="word"
                key={id}
                className={"my-[.25em] mx-[.3em] text-3xl px-1 " + state}
              >
                {letters.map(({ letter, state, id }) => (
                  <span key={id} id="key" className={state}>
                    {letter}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button className="text-xl  hover:text-sprint-blue">
              <ReloadIcon />
            </button>
          </div>
          {

            testResult !== null && <h2>finish</h2>
          }
        </>
      )}
    </section>
  );
};
