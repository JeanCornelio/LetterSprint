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
        },
        
        setIsPending:(state, action:PayloadAction<boolean>) =>{
            const {payload} = action
            state.isPending = payload
        },

    
    }
})

export default authSlice.reducer
export const {signInWithExternalAccount, checkingStatus, logout, chekUsernameStatus, setUsername, setAuthenticatedState, setCurrentUser, setIsPending} = authSlice.actions
