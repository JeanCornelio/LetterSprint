import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MODES, TIMES, WORDS } from "../../constants";
import { MODE, TIME, WORD } from "../../types/Text";

interface TestInitialState {
  time: number;
  mode: string;
  words: number;
  puntuation: boolean; // true or false
  number: boolean; // true or false
}

const initialState: TestInitialState = {
  time: TIMES["30"],
  mode: MODES["time"], // time | words | quote
  words: WORDS["50"],
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
  },
});

export default testSlice.reducer;
export const {
  setTestMode,
  setTestTime,
  setTestWords,
  setTestPuntuation,
  setTestNumber,
} = testSlice.actions;
