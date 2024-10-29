import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        uid: "",
        email:"",
        displayName:"",
        photoURL:"",
        state: "not_authenticated",  //authenticated, not_authenticated, checking
        errorMessage: null
    },
    reducers:{

        checkingStatus: (state) => {
             state.state = 'checking'
        },

        singInGoogle: (state, action: PayloadAction) => {
            const {payload} = action

           state.uid = payload.uid
           state.email = payload.email
           state.displayName = payload.displayName
           state.photoURL = payload.photoURL
           state.state = "authenticated"
        },

        logout:(state,  action: PayloadAction)=>{
            const {payload} = action
            
            state.uid = ""
            state.email = ""
            state.displayName = ""
            state.photoURL = ""
            state.state = "not_authenticated"
            state.errorMessage = payload.errorMessage
           
        }

    }
})

export default authSlice.reducer
export const {singInGoogle, checkingStatus, logout} = authSlice.actions
