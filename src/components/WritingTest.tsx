import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { Letter } from "./Letter";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

const correct = "text-white ";
const incorrect = "text-red-600 opacity-50";

interface Letters {
    letter: string;
    state: string;
    id: string;
}

interface Word {
    word: string;
    id:string;
    class: string;
    letters: Letters
}

export const WritingTest = () => {
  const [wordToComplete, setwordToComplete] = useState("");
  const [position, setPosition] = useState(0);
  const [wordGoal, setWordGoal] = useState<string | null>(null);
  const [test, setTest] = useState<Word[]>([]);
  const [loading, setLoading] = useState<string | null>("loading"); // loading,
  const count = useRef(0);
  const { seconds } = useTimer();

  useEffect(() => {
    setLoading("loading");

    const words: Word[]  = text.split(" ").map((word) => {
      return {
        word,
        id: `${word}-${crypto.randomUUID()}`,
        class: "",
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
   
    setLoading(null);
  }, []);

  useEffect(() => {
    setWordGoal(test[position]?.word );
   
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (
        (event.key.length === 1 && event.code !== "Space") ||
        event.code === "Backspace"  
      ) {
        //Ir atras en las letras
        if (
          event.code === "Backspace" &&
          wordToComplete.length > 0 &&
          count.current > 0
        ) {
          setwordToComplete((current) => current.slice(0, -1));
          count.current -= 1;
        }

        const currentWord: Word = test[position];
        const letters = currentWord.letters;

        //Cuando no exista una letra en esa posicion
        if( !letters[count.current]) return 

        const newStateTest = test.map((word) => {
          if (word.id === currentWord.id) {
            return {
              ...word,
              letters: word.letters.map((letter: Letters) => {
                console.log(count.current)

                if (letter.id === letters[count.current]?.id ) {
                  return {
                    ...letter,
                    state: (letter.state =
                      event.key === "Backspace"
                        ? ""
                        : letter.letter === event.key
                        ? "correct"
                        : "incorrect"),
                  };
                }
                return letter;
              }),
            };
          }
          return word;
        });
        
    
        setTest(newStateTest);
        

        //Agregar la palabra si es de un lenght a,b o c
        if (event.key.length === 1) {
          count.current += 1;
          setwordToComplete((current) => (current += event.key));
        }
      }

      //Ir a la siguiente letra
      if (event.code === "Space" && wordToComplete !== '') {
        setPosition((current) => current + 1);
        setwordToComplete("");
        count.current = 0;
      }
    };


    //Mas 1+ para al hacer espacion saltar a la otra letra
        
    if ( (wordGoal?.length + 1) === wordToComplete.length) {
      setPosition((current) => current + 1);
      setwordToComplete("");
      count.current = 0;
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wordToComplete, test]);

  useEffect(() => {
    seconds === 0 && setLoading("loading");
  }, [seconds]);

  return (
    <section className="mt-8">
      <h2 className=" text-center text-4xl mb-5 text-sprint-blue">{seconds}</h2>
      <form action="">
        <div className="relative w-full flex flex-wrap ">
          {loading === "loading" ? (
            <h2>{loading}</h2>
          ) : (
            test.map(({ word, id, letters }) => (
              <div
                id="word"
                key={id}
                className="relative my-[.25em] mx-[.3em] text-3xl"
              >
                {letters.map(({ letter, state, id }) => (
                  <span
                    key={id}
                    id="key"
                    className={
                      state === ""
                        ? null
                        : state === "correct"
                        ? correct
                        : incorrect
                    }
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))
          )}
        </div>
      </form>
    </section>
  );
};
