import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/slice"
import timerReducer from "./timer/slice"
import authReducer from "./auth/slice";
export const store = configureStore({
    reducer: {
        test: testReducer,
        timer: timerReducer,
        auth: authReducer
    }
})