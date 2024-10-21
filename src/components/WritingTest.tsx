import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLoading } from "../hooks/useLoading";
import { LoadingIcon, ReloadIcon } from "../icons/Icons";
import { TIMER } from "../constants";

const text =
  "Lorem Ipsum is simply dummy text dummy textost";

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

  const { loading, handleLoading } = useLoading();
  const { seconds, handleTimerState, timerState, handleTimerTime } = useTimer();
  const testContent = useRef(null);

  const createTest = () => {
    handleLoading(true);

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

    setTest(words);

    setTimeout(() => {
      handleLoading(false);
    }, 1000);
  };

  useEffect(() => {
    createTest();
  }, []);

  const tocheckWordCorreclyCompleted = (word: Word) => {
    const lettersError = word.letters.some(
      (letter) =>
        letter.state === "incorrect" ||
        letter.state === "incorrect active" ||
        letter.state === "incorrect extra" ||
        letter.state === ""
    );

    return lettersError ? "error typed" : "typed";
  };

  const resestTest = () => {
    //get New test
    createTest();
    setWordPosition(0);
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
  

    const handleKeyDown = (event: React.KeyboardEvent) => {
      //Start Game
      handleTimerState(TIMER["start"]);
        
      //abstraccion of events variables
      const { code, key } = event;
      
      // Cantidad de letras extras permitidas

      // la palabra que esta activa
      const currentWord: Word = test[wordPosition];

      
      // Las letras de la palabra activa
      const letters: Letters[] = currentWord.letters;
    
      //total of words nad total of letters to completed 
      const totalWordsToCopleted = wordPosition + 1 
      const lastLettersToCompleted =  letterPosition.current + 1
        
        if( totalWordsToCopleted === test.length && letters.length === lastLettersToCompleted){
            console.log(letters, currentWord, 'final')  
           
        }
      

      

      //Escapar el espacion que salte la linea, solamente si se ha escrito algo si LetterPosition.current > 0
      if (code === "Space" && letterPosition.current > 0) {
        //Reset Letter position
        letterPosition.current = 0;
        //Go to next word
        setWordPosition((current) => current + 1);

        currentWord.state = tocheckWordCorreclyCompleted(currentWord);
        test[wordPosition + 1].state = "active";
      }

      // Cuando se preciona el spacio y no se ha intentando jugar ninguna letra
      if (code === "Space") {
        return;
      }

      const updateLetter = letters.map((letter: string, index) => {
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

      // Agrega una palabra mas cuando lo que escribimos es mayor que la palabrar a completar y que sea menor que 19
      if (
        letterPosition.current > currentWord.word.length - 1 &&
        key.length === 1 && letterPosition.current < 19
      ) {
        //console.log('es mayor y tiene que agregar', )
        updateLetter.push({
          letter: key,
          state: "incorrect extra",
          id: `${key}-${crypto.randomUUID()}`,
        });
      }

      // borrar la palabras agregadas y mal escritas
      if (
        letterPosition.current > currentWord.word.length &&
        key === "Backspace"
      ) {
        updateLetter.pop();
      }

      const updateWords = { ...currentWord, letters: updateLetter };

      const updateTest = [...test];

      updateTest[wordPosition] = updateWords;

      setTest(updateTest);

      //Pasar a la siguiente letra
      if (key.length === 1) {
        letterPosition.current += 1;
      }

      if (key === "Backspace") {
        // Borrar unicamente cuando la posicion de la letra sea mayor que 0
        if (letterPosition.current > 0) {
          // Remover el estado activo de la letra actual antes de mover el cursor hacia atrás
          test[wordPosition].letters[letterPosition.current - 1].state = ""; // Desactivar el estado de la letra actual

          // Mover la posición hacia atrás
          letterPosition.current -= 1;
          //Retur para que no se salte la ultima al final
          return
        }

        // si la palabra escrita anteriormente tuvo un error, manejar la navegación a la palabra anterior
        if (
          wordPosition > 0 &&
          letterPosition.current === 0 &&
          test[wordPosition - 1].state === "error typed"
        ) {
          setWordPosition((current) => current - 1);
         
          // Mover la posición de la letra a la longitud de la palabras anteriores que fueron esritas 
          letterPosition.current = test[wordPosition - 1].letters.filter(letter =>  letter.state !== '').length;

          // Remover el estado de error y activar la palabra anterior
          test[wordPosition - 1].state = "active";
          test[wordPosition].state = "";

      

          setTest([...test]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [test, wordPosition]);

  useEffect(() => {
    if (seconds === 0) {
      //reset All and show modal, remove events , reset test and properties
      handleTimerState(TIMER["stop"]);
      setTimeout(resestTest, 200);
    }
  }, [seconds]);

  //EL truco esta en colocar esto en el padre de las letras y borrar la letra anterior h-[204px] overflow-y-clip overflow-x-visible

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
          <div className=" w-full flex flex-wrap   relative  text-pretty" ref={testContent}>
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
        </>
      )}
    </section>
  );
};
