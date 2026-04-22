import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Test } from "../interfaces/Test";

interface TestResultsState {
  tests: Test[];
}

const initialState: TestResultsState = {
  tests: [],
};

export const testResultSlice = createSlice({
  name: "testResult",
  initialState,
  reducers: {
    setTets: (state, action: PayloadAction<Test>) => {
      state.tests = [action.payload, ...state.tests];
    },
    setActualTests: (state, action: PayloadAction<Test[]>) => {
      state.tests = action.payload;
    },
  },
});

export default testResultSlice.reducer;
export const { setTets, setActualTests } = testResultSlice.actions;