import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        uid: "",
        email:"",
        displayName:"",
        photoURL:"",
        userName:"",
        state: "not_authenticated",  //authenticated, not_authenticated, checking, checkuserName
        errorMessage: null,
    },
    reducers:{

        checkingStatus: (state) => {
             state.state = 'checking'
        },

       chekUserNameStatus: (state) => {
             state.state = 'checkuserName'
        },

        setUserName: (state,  action: PayloadAction) => {
            const {payload} = action
            state.userName = payload.userName
        },

    
        singInGoogle: (state, action: PayloadAction) => {
            const {payload} = action
            
            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.displayName
            state.photoURL = payload.photoURL
           
        },

        logout:(state,  action: PayloadAction)=>{
            const {payload} = action
            
            state.uid = ""
            state.email = ""
            state.displayName = ""
            state.photoURL = ""
            state.state = "not_authenticated"
            state.errorMessage = payload.errorMessage
           
        },

        setAuthenticatedState:(state)=>{
            state.state = "authenticated"
        },

        setCurrentUser:(state, action: PayloadAction)=>{
            const {payload} = action

            console.log(payload)

            state.uid = payload.uid
            state.email = payload.email
            state.displayName = payload.displayName
            state.photoURL = payload.photoURL
            state.userName = payload.userName
            state.state = "authenticated"
        }
        

    }
})

export default authSlice.reducer
export const {singInGoogle, checkingStatus, logout, chekUserNameStatus, setUserName, setAuthenticatedState, setCurrentUser} = authSlice.actions
