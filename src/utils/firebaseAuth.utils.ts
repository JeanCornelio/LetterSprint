
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { firebaseAuth } from "./firebase.utils"


export const googleProvider = new GoogleAuthProvider()


export const singInGooglePopup = async () =>{
    try {
        const resp = await signInWithPopup(firebaseAuth, googleProvider)
        console.log( resp)
        const {isNewUser} = resp._tokenResponse
        const {uid, email, displayName, photoURL} = resp.user
        
        return({uid, email, displayName, photoURL, ok: true, errorMessage:null, isNewUser})

    } catch (error) {
        const errorMessage  = error.message

        return {
            ok: false,
            errorMessage
        }

    }


}



