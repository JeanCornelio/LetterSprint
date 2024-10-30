
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import { firebaseAuth, firebaseBD } from "./firebase.utils"
import {  doc, getDoc, setDoc } from "firebase/firestore";


export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth();


export const singInGooglePopup = async () =>{
    try {
        const resp = await signInWithPopup(firebaseAuth, googleProvider)
     
      
        const {uid, email, displayName, photoURL} = resp.user
        
        return({uid, email, displayName, photoURL, ok: true, errorMessage:null})

    } catch (error) {
        const errorMessage  = error.message

        return {
            ok: false,
            errorMessage
        }

    }

}

export const checkUserExist = async (uid) =>{
  
    const userRef = doc(firebaseBD, "users", uid);

    const userDoc = await getDoc(userRef)
 
    return {exist:userDoc.exists(),data:userDoc.data()}
}


export const createUserAccount = async (user) =>{
     try {

        const userRef = doc(firebaseBD, "users", user.uid);

        await setDoc(userRef, {
            ...user
        });

        return true

     } catch (error) {
        console.log(error)
        return false
     }
}




export const logout  = async () =>{
 
    try {
        await signOut(auth);
        
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
    
}