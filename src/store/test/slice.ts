import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MODES, TIMES, WORDS } from "../../constants";
import { MODE, TIME, WORD } from "../../types/Text";
import { TestInitialState, Difficulty } from "../../interfaces/testConfiguration";


const initialState: TestInitialState = {
  time: TIMES["15"],
  mode: MODES["time"], // time | words | quote
  words: WORDS["100"],
  puntuation: false,
  number: false,
  difficulty: 'medium',
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTestMode: (state, action: PayloadAction<MODE>) => {
      const { payload } = action;
      state.mode = payload;
    },
    setTestTime: (state, action: PayloadAction<TIME>) => {
      const { payload } = action;
      state.time = payload;
    },

    setTestWords: (state, action: PayloadAction<WORD>) => {
      const { payload } = action;
      state.words = payload;
    },

    setTestPuntuation: (state) => {
      state.puntuation = !state.puntuation;
    },

    setTestNumber: (state) => {
      state.number = !state.number;
    },

    setTestDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },

    setTestConfiguration:(state, action: PayloadAction<TestInitialState>) =>{
      const {payload} = action
      state.time = payload.time;
      state.mode = payload.mode;
      state.words = payload.words;
      state.puntuation = payload.puntuation;
      state.number = payload.number;
    },

resetTestConfiguration:(state) =>{
     
      state.time = TIMES["15"];  
      state.mode = MODES["time"];      
      state.words = WORDS["100"];
      state.puntuation = false
      state.number = false
      state.difficulty = 'medium'
    }

  },
});

export default testSlice.reducer;
export const {
  setTestMode,
  setTestTime,
  setTestWords,
  setTestPuntuation,
  setTestNumber,
  setTestDifficulty,
  setTestConfiguration,
  resetTestConfiguration
} = testSlice.actions;
