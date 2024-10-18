import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLoading } from "../hooks/useLoading";
import { LoadingIcon, ReloadIcon } from "../icons/Icons";
import { TIMER } from "../constants";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

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
  const [wordToComplete, setwordToComplete] = useState("");
  const [wordPosition, setWordPosition] = useState(0);
  const [wordGoal, setWordGoal] = useState<string | null>(null);
  const letterPosition = useRef(0);
  const [test, setTest] = useState<Word[]>([]);

  const { loading, handleLoading } = useLoading();
  const { seconds, handleTimerState, timerState, handleTimerTime } = useTimer();

  const createTest = () => {
    handleLoading(true);

    const words: Word[] = text.split(" ").map((word) => {
      return {
        word,
        id: `${word}-${crypto.randomUUID()}`,
        state: "",
        letters: word.split("").map((letter) => {
          return {
            letter: letter,
            state: "",
            id: `${letter}-${crypto.randomUUID()}`,
          };
        }),
      };
    });

    setTest(words);

    setTimeout(() => {
      handleLoading(false);
    }, 1000);
  };

  useEffect(() => {
    createTest();
  }, []);

  const toErase = () => {
    setwordToComplete((current) => current.slice(0, -1));
    letterPosition.current -= 1;
  };

  const toWrite = (key: string) => {
    letterPosition.current += 1;
    setwordToComplete((current) => (current += key));
  };

  const toSkipWord = () => {
    setWordPosition((current) => current + 1);
    setwordToComplete("");
    letterPosition.current = 0;
  };

  const tocheckWordCorreclyCompleted = (word: Word) => {
    const lettersError = word.letters.some(
      (letter) =>
        letter.state === "incorrect" || letter.state === "incorrect active"
    );

    return lettersError ? "error typed" : "typed";
  };

  const resestTest = () => {
    //get New test
    createTest();
    setWordGoal(null);
    setWordPosition(0);
    setwordToComplete("");
    letterPosition.current = 0;
    handleTimerTime();
  };

  useEffect(() => {
    const handleMousemove = () => {
      handleTimerState(TIMER["pause"]);
    };

    document.addEventListener("mousemove", handleMousemove);

    return () => document.removeEventListener("mousemove", handleMousemove);
  }, []);

  useEffect(() => {
    setWordGoal(test[wordPosition]?.word);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      handleTimerState(TIMER["start"]);

      const { code, key } = event;
      const currentWord: Word = test[wordPosition];
      const letters = currentWord.letters;
      if (code === "Backspace" && wordToComplete.length > 0) {
        toErase();
      }

      if ((key.length === 1 && code !== "Space") || code === "Backspace") {
        //word Active
        currentWord.state = "active";

     

        //Cuando no exista una letra en esa posicion
        if (!letters[letterPosition.current]) return;

        //active letter

        if (letterPosition.current > 0) {
          letters[letterPosition.current - 1].state = letters[
            letterPosition.current - 1
          ].state.replace("active", "");
        }
        //VALIDAR EL BUG DEL ACTIVE AL FINAL
        const updateLetter = currentWord.letters.map(
          (letter: Letters, index) => {
            if (index === letterPosition.current) {
              return {
                ...letter,
                state: (letter.state =
                  key === "Backspace"
                    ? ""
                    : letter.letter === key
                    ? "correct active"
                    : "incorrect active"),
              };
            }

            if (index === letterPosition.current - 1 && key === "Backspace") {
              return {
                ...letter,
                state: "active",
              };
            }

          

            return letter;
          }
        );

        const updateWords = { ...currentWord, letters: updateLetter };

        const updateTest = [...test];

        updateTest[wordPosition] = updateWords;

        setTest(updateTest);
      }

      //Agregar la palabra si es de un lenght a,b o c
      if (key.length === 1 && code !== "Space") {
        toWrite(key);
      }

      //Ir a la siguiente letra
      if (
        (code === "Space" && wordToComplete !== "") ||
        wordGoal?.length + 1 === wordToComplete.length
      ) {
        currentWord.state = tocheckWordCorreclyCompleted(currentWord);
        
        console.log(letters[letterPosition.current - 1].state);
        toSkipWord();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [wordToComplete, test, wordGoal, wordPosition]);

  useEffect(() => {
    if (seconds === 0) {
      //reset All and show modal, remove events , reset test and properties
      handleTimerState(TIMER["stop"]);
      setTimeout(resestTest, 200);
    }
  }, [seconds]);

  return (
    <section className="mt-8">
      <h2
        className={
          (timerState !== TIMER["start"] ? "invisible" : "") +
          " text-center text-4xl mb-5 text-sprint-blue transition-all"
        }
      >
        {seconds}
      </h2>

      {loading ? (
        <div className="w-full flex justify-center mt-14">
          <LoadingIcon />
        </div>
      ) : (
        <>
          <div className=" w-full flex flex-wrap ">
            {test.map(({ id, letters, state }) => (
              <div
                id="word"
                key={id}
                className={"my-[.25em] mx-[.3em] text-3xl " + state}
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
        </>
      )}
    </section>
  );
};
