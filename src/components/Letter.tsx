import { useEffect, useState } from "react"

export const Letter = ({word,wordGoal,wordActive, wordToComplete}) => {  
  const [lettersChecked, setlettersChecked] = useState([])

  const correct = 'text-white '
  const incorrect = 'text-red-600 opacity-50'

 
  // Lo que tenemos que haces es comprobar si las palabras que hemos enviados conformam la letra 
  console.log(first)
  useEffect(() => {

    if(!wordToComplete) return

    if(wordGoal.id === wordActive){

      console.log({word, letter: wordToComplete})
      setlettersChecked( (prev) =>[ 
        { letter: wordToComplete, id: wordActive },
        ...prev
      ])
    
      
   } 
  

  }, [word, wordGoal, wordActive,  wordToComplete])
  

 
 console.log(lettersChecked)

  return (
    <>
        {
               word.split('').map((letter: string, index) =>(
                <span key={`${letter}-${index}`}   className="" >{letter}</span>
            )) 
        }
    </>
  )
}
