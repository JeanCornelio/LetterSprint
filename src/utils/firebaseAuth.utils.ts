
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { firebaseAuth } from "./firebase.utils"


export const googleProvider = new GoogleAuthProvider()


export const singInGooglePopup = async () =>{
    try {
        const resp = await signInWithPopup(firebaseAuth, googleProvider)
        const {uid, email, displayName, photoURL} = resp.user

        //console.log({uid, email, displayName, photoURL})
        
        return({uid, email, displayName, photoURL, ok: true, errorMessage:null})

    } catch (error) {
        const errorMessage  = error.message

        return {
            ok: false,
            errorMessage
        }

    }


}



