import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firebaseAuth, firebaseBD } from "./firebase.utils";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const auth = getAuth();



const handleQuery = (db, collectionName: string, input:string, rule:string, value: string | number  ) =>{
    try {
        const q = query(collection(db, collectionName), where(input, rule , value))
        return q
    } catch (error) {
        return 
    }

}

export const signInGooglePopup = async () => {
  try {
    const resp = await signInWithPopup(firebaseAuth, googleProvider);

    const { uid, email, displayName, photoURL } = resp.user;

    return { uid, email, displayName, photoURL, ok: true, errorMessage: null };
  } catch (error) {

    const errorMessage = error.message;
    
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const signInGithub = async () => {
  try {
    const resp = await signInWithPopup(firebaseAuth, githubProvider);

    const { uid, email, displayName, photoURL } = resp.user;

    return { uid, email, displayName, photoURL, ok: true, errorMessage: null };
  } catch (error) {

    const errorMessage = error.message;
    
    return {
      ok: false,
      errorMessage,
    };
  }
};


export const createAccountWithEmailAndPassword = async ({email:userEmail, password, username}) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, userEmail, password);

   
    const { uid, email, displayName, photoURL } = resp.user;

    
     sendEmailVerification(resp.user).catch(()=>{
       return { ok: false, errorMessage:'Error sending the verification email'};
    })
 
    return { uid, email, displayName, photoURL, username, ok: true, errorMessage: null }

  } catch (error) {

    const errorMessage = error.message;
   
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const signInEmailAndPassword = async ({email:userEmail, password}) => {
  try {
   
    await signInWithEmailAndPassword(auth, userEmail, password);

    const emailVerified = await userEmailVerify()

    if(!emailVerified){
       return { ok: false, errorMessage:'Please verified your email and confirm your account'}
    }

    return { ok: true, errorMessage: ''}

  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};


export const getCurrentUser = async () =>{

  const currentUser = auth.currentUser

  const userUid = currentUser?.uid

  const user =  await checkUserExist(userUid as string)


  if(!user.data) return {ok: false, errorMessage:  'user not exist'}
  
     
 const {displayName,email,photoURL, uid, username, testConfig} = user.data

  return {displayName,email,photoURL, uid, username, testConfig}

}

const userEmailVerify = async () =>{

  const currentUser = auth.currentUser

  const emailVerified = currentUser?.emailVerified //true or false

  return emailVerified
}



export const createUserAccount = async (user) => {
 try {

    //User Configuration
    const testConfig = {
      time: "30",
      mode: "time",
      words: "50",
      puntuation: false,
      number: false,
    };

    const userRef = doc(firebaseBD, "users", user.uid);

     await setDoc(userRef, {
      ...user,
      testConfig
    });
      
   return {
      ok: true,
      errorMessage:'',
    };
  } catch (error) {
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const checkUserExist = async (uid: string) => {

  const userRef = doc(firebaseBD, "users", uid);

  const userDoc = await getDoc(userRef);

  return { exist: userDoc.exists(), data: userDoc.data() };
};

export const checkUsernameExist = async (username:string) =>{

 const query  =  handleQuery(firebaseBD, 'users', "username" , "==", username)

 const querySnapshot = await getDocs(query);

 return querySnapshot.empty

}