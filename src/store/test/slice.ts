import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MODES, TIMES, WORDS } from "../../constants";
import { MODE, TIME, WORD } from "../../types/Text";
import { TestInitialState } from "../../interfaces/testConfiguration";


const initialState: TestInitialState = {
  time: TIMES["15"],
  mode: MODES["time"], // time | words | quote
  words: WORDS["100"],
  puntuation: false,
  number: false,
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
  setTestConfiguration,
  resetTestConfiguration
} = testSlice.actions;
