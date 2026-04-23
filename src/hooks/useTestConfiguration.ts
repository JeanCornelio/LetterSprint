import { TestInitialState, Difficulty } from "../interfaces/testConfiguration";
import {
  resetTestConfiguration,
  setTestConfiguration,
  setTestDifficulty,
  setTestMode,
  setTestNumber,
  setTestPuntuation,
  setTestSoundEffects,
  setTestTime,
  setTestWords,
} from "../store/test/slice";
import { MODE, TIME, WORD } from "../types/Text";
import { useAppDispatch, useAppSelector } from "./useStore";


export const useTestConfiguration = () => {

  const { mode, time, words, puntuation, number, difficulty, soundEffects } = useAppSelector(
    ({ test }) => test
  );

  const dispatch = useAppDispatch();

  const setMode = (mode: MODE) => {
    dispatch(setTestMode(mode));
  };

  const setTime = (time: TIME) => {
    dispatch(setTestTime(time));
  };

  const setWordQuantity = (quantity: WORD) => {
    dispatch(setTestWords(quantity));
  };

  const puntuationToggle = () => {
    dispatch(setTestPuntuation());
  };

  const numberToggle = () => {
    dispatch(setTestNumber());
  };

  const soundEffectsToggle = () => {
    dispatch(setTestSoundEffects());
  };

  const setDifficulty = (difficulty: Difficulty) => {
    dispatch(setTestDifficulty(difficulty));
  };

  const setCurrentUserTestConfiguration = (config: TestInitialState) =>{
      dispatch(setTestConfiguration(config))
  }

  const resetConfiguration = () =>{
       dispatch(resetTestConfiguration())
  }

  return {
    setMode,
    setTime,
    setWordQuantity,
    puntuationToggle,
    numberToggle,
    soundEffectsToggle,
    setDifficulty,
    mode,
    timeActive: time,
    words,
    puntuation,
    number,
    soundEffects,
    difficulty,
    isPuntuatioActive: puntuation,
    isNumberactive: number,
    setCurrentUserTestConfiguration,
    resetConfiguration
  };
};
