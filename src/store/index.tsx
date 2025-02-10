import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/slice";
import timerReducer from "./timer/slice";
import authReducer from "./auth/slice";
import result from "./testResults/slice";

export const store = configureStore({
    reducer: {
        test: testReducer,
        timer: timerReducer,
        auth: authReducer,
        results: result,
    },
});
