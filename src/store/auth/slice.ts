import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        uid: "",
        email:"",
        displayName:"",
        photoURL:"",
        username:"",
        state: "not_authenticated",  //authenticated, not_authenticated, checking, checkUserName
        errorMessage: null,
        isPending: true, //true false
        stats:{
            testsCompleted: 0,
            wordsWritten: 0,
            timeTyping: 0,
            timeRecord: [],
            wordRecord: [],
        }
    },
    reducers:{

        checkingStatus: (state) => {
             state.state = 'checking'
        },

       chekUsernameStatus: (state) => {
             state.state = 'checkUserName'
        },

        setUsername: (state,  action: PayloadAction) => {
            const {payload} = action
            state.username = payload.username
        },

    
        signInWithExternalAccount: (state, action: PayloadAction) => {
            const {payload} = action
            
            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.displayName
            state.photoURL = payload.photoURL
           
        },

        logout:(state,  action: PayloadAction<string>)=>{
            const {payload} = action
    
            state.uid = ""
            state.email = ""
            state.displayName = ""
            state.photoURL = ""
            state.username = ""
            state.state = "not_authenticated"
            state.errorMessage = payload
           
        },

        setAuthenticatedState:(state)=>{
            state.state = "authenticated"
        },

        setCurrentUser:(state, action: PayloadAction)=>{
            const {payload} = action

            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.displayName
            state.photoURL = payload.photoURL
            state.username = payload.username
            state.state = "authenticated"
            state.isPending = false
            state.stats = payload.stats

            
        },
        
        setIsPending:(state, action:PayloadAction<boolean>) =>{
            const {payload} = action
            state.isPending = payload
        },

        setErrorMessage: (state, action:PayloadAction<string>) =>{
              const {payload} = action
              state.errorMessage = payload
        },

        setCurrentStats:(state, action: PayloadAction) =>{
            const {payload} = action
    
            const stats = {
                testsCompleted: state.stats. testsCompleted += payload.testsCompleted,
                wordsWritten: state.stats.wordsWritten += payload.wordsWritten,
                timeTyping: state.stats.timeTyping += payload.timeTyping,
                timeRecord: payload.timeRecord,
                wordRecord: payload.wordRecord,
            }
            state.stats = stats
        }
    }
})

export default authSlice.reducer
export const {signInWithExternalAccount,setCurrentStats, checkingStatus, logout, chekUsernameStatus, setUsername, setAuthenticatedState, setCurrentUser, setIsPending, setErrorMessage} = authSlice.actions
