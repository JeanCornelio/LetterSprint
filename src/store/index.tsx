import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/slice"
export const store = configureStore({
    reducer:{
        test: testReducer
    }
})