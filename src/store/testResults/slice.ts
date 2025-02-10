import { createSlice } from "@reduxjs/toolkit";

export const testResultSlice = createSlice({
  name: "testResult",
  initialState: {
  
    tests: [],
  /*   testsCompleted: 0,
    wordsWritten: 0,
    timeTyping: 0,
    timeRecord: [],
    wordRecord: [], */
  },
  reducers:{

    setTets:(state, action)=>{
       const {payload}= action;
       state.tests = [payload, ...state.tests]
       //Note de 2/5/2025: I think the problem is here, the form how we save the data in the state, or could be the way I'm calling the data in firebaseService
    },

    setActualTests:(state, action)=>{
        const {payload}= action;
        state.tests = payload
    }

  }
});

export default testResultSlice.reducer
export const {setTets, setActualTests} = testResultSlice.actions
