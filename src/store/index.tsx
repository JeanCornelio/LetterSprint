import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/slice"
import timerReducer from "./timer/slice"
export const store = configureStore({
    reducer:{
        test: testReducer,
        timer:timerReducer
    }
})