import { useEffect, useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useLoading } from "../hooks/useLoading";
import { LoadingIcon, ReloadIcon } from "../icons/Icons";
import { TIMER } from "../constants";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

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
  const [wordGoal, setWordGoal] = useState<string | null>(null);
  const [caretPosition, setCaretPosition] = useState({ y: 10, x: 8.5 });
  const letterPosition = useRef(0);
  const [test, setTest] = useState<Word[]>([]);

  const { loading, handleLoading } = useLoading();
  const { seconds, handleTimerState, timerState, handleTimerTime } = useTimer();
  const testContent = useRef(null)
  const caret = useRef(null)
  const [rowPosition, setRowPosition] = useState(0);
  const [row, setRow] = useState(0);
  const createTest = () => {
    handleLoading(true);

    const words: Word[] = text.split(" ").map((word, index) => {
      return {
        word,
        id: `${word}-${crypto.randomUUID()}`,
        state: index === 0 ? "active" : '',
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
        letter.state === "incorrect" || letter.state === "incorrect active" || letter.state === "incorrect extra" || letter.state === ""
    );

    return lettersError ? "error typed" : "typed";
  };

  const resestTest = () => {
    //get New test
    createTest();
    setWordGoal(null);
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
    setWordGoal(test[wordPosition]?.word);

    const handleKeyDown = (event: React.KeyboardEvent) => {

      //Start Game 
      handleTimerState(TIMER["start"]);

      //abstraccion of events variables 
      const { code, key } = event;






      // la palabra que esta activa
      const currentWord: Word = test[wordPosition];


      //activar la palabra activa
      if (currentWord.state.length === 0) {
        currentWord.state = 'active'
      }




      // Las letras de la palabra activa
      const letters: Letters[] = currentWord.letters;









      //Escapar el espacion que salte la linea, solamente si se ha escrito algo si LetterPosition.current > 0  
      if (code === 'Space' && letterPosition.current > 0) {
        //Reset Letter position 
        letterPosition.current = 0
        //Go to next word
        setWordPosition((current) => current + 1);
        //Se suman las cantidades de posiciones en la word, esto se reinicia luego.
        setRowPosition((current) => current + 1)
        const lettersNoWrited = test[wordPosition].letters.filter((el) => el.state === '')

        const total = (lettersNoWrited.length + 1) * 18 // * 18 to N letters and 1+ with a Space

        currentWord.state = tocheckWordCorreclyCompleted(currentWord);

        setCaretPosition((prev) => {
          return {
            ...prev,
            x: prev.x += total
          };
        })

      }


      let contentChildren = Array.from(testContent.current.children).map((child, index) => {

        return child.getBoundingClientRect().top


      });


      const rowsGroups = Object.groupBy(contentChildren, (el) => el)

      const totalOfRows = Object.keys(rowsGroups).map((el) => {

        return rowsGroups[el]
      })

      //Remover la posicion 0
      totalOfRows.shift()

      console.log(totalOfRows[0].length, rowPosition, totalOfRows[0].lenght > wordPosition + 1)
      //console.log(testContent.current.getBoundingClientRect().right)

      if (totalOfRows[row].length === rowPosition + 1 && code === 'Space') {
        console.log('irse a la otra linea')

        setCaretPosition((prev) => {
          return {
            ...prev,
            x: prev.x = 8.5,
            y: prev.y += 52
          };
        })

        setRow(prev => prev += 1)
        // La posicion de la palabra en la fila de palabras, Validar cuando el caret llegue a la ultima palabra y se pueda borrar
        setRowPosition(0)
      }






      // Cuando se preciona el spacio y no se ha intentando jugar ninguna letra
      if (code === 'Space') {
        return
      }










      const updateLetter = letters.map((letter: string, index) => {



        if (index === letterPosition.current && key.length === 1) {
          //correcta o incorrecta
          return {
            ...letter,
            state: letter.letter === key
              ? "correct"
              : "incorrect"
          }
        }


        if (index === letterPosition.current - 1 && key === "Backspace") {
          return {
            ...letter,
            state: letter.state === 'incorrect' || letter.state === 'correct' ? '' : letter.state,
          };
        }



        return letter
      })



      // Agrega una palabra mas cuando lo que escribimos es mayor que la palabrar a completar
      if (letterPosition.current > currentWord.word.length - 1 && key.length === 1) {
        //console.log('es mayor y tiene que agregar', )
        updateLetter.push({ letter: key, state: 'incorrect extra', id: `${key}-${crypto.randomUUID()}` })
      }


      // borrar la palabras agregadas y mal escritas
      if (letterPosition.current > currentWord.word.length && key === 'Backspace') {
        updateLetter.pop()
      }



      const updateWords = { ...currentWord, letters: updateLetter };




      const updateTest = [...test];

      updateTest[wordPosition] = updateWords;


      setTest(updateTest);



      //Pasar a la siguiente letra
      if (key.length === 1) {
        letterPosition.current += 1;

        //mover el caret cuando se escriba una letra
        setCaretPosition((prev) => {
          return {
            ...prev,
            x: prev.x += 18
          };
        })
      }



      if (key === "Backspace") {

        // Borrar unicamente cuando la la posicion de la lettra sea 0 significa que llegaste al final de la letra y no puedes borrar mas
        if (letterPosition.current > 0) {
          letterPosition.current -= 1

          //mover el caret cuando se borre una letra
          setCaretPosition((prev) => {
            return {
              ...prev,
              x: prev.x -= 18
            };
          })
        }


        //si la palabra escrita anteriormente tuvo un error enviarlo a la palabra anterior

        if (wordPosition > 0 && letterPosition.current === 0 && test[wordPosition - 1].state === 'error typed') {

          setWordPosition((current) => current - 1);
          //enviarle la cantidad de palabras de la anterior
          letterPosition.current = test[wordPosition - 1].letters.length;
          //Remover el error para saber si la escribira bien
          test[wordPosition - 1].state = ''
          //Ir a la palabra anterior con el caret si esta esta mal escrita y tuvo un error
          setCaretPosition((prev) => {
            return {
              ...prev,
              x: prev.x -= 18
            };
          })
          return

        }


      }










    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [test, wordGoal, wordPosition]);







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

          <div className=" w-full flex flex-wrap   relative " ref={testContent}>
            <div className="caret" style={{ position: 'absolute', left: caretPosition.x, top: caretPosition.y, transition: 'transform 0.1s ease' }} ref={caret}></div>
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
