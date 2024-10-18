import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const timerSlice = createSlice({
    name:'timer',
    initialState:{
    
        state: 'stop',
        seconds:0,
    },
    reducers: {

        setState: (state, action: PayloadAction<string>) =>{
            state.state = action.payload
        },
        setSeconds: (state, action: PayloadAction<number>) =>{
            state.seconds = action.payload
        },
    }
})


export default timerSlice.reducer
export const {setState, setSeconds} = timerSlice.actions