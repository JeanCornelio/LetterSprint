
import { setTestMode, setTestNumber, setTestPuntuation, setTestTime, setTestWords } from "../store/test/slice"
import { MODE, TIME, WORD } from "../types/Text"

import { useAppDispatch, useAppSelector } from "./useStore"


export const useTestConfiguration = () => {
    const {mode, time, words,  puntuation, number} =  useAppSelector(({test}) => test)
    const dispatch = useAppDispatch()

    const setMode = (mode:MODE) =>{
     
      dispatch(setTestMode(mode))
    }

    const setTime = (time:TIME) =>{
      dispatch(setTestTime(time))
    }
  
    const setWordQuantity = (quantity:WORD ) => {
      dispatch(setTestWords(quantity))
    }

    const puntuationToggle = () =>{
      dispatch(setTestPuntuation())
    }

    const numberToggle = () =>{
      dispatch(setTestNumber())
    }
  
    return {
        setMode,
        setTime,
        setWordQuantity,
        puntuationToggle,
        numberToggle,
        mode,
        timeActive:time, 
        words,
        isPuntuatioActive: puntuation,
        isNumberactive: number
  }
}