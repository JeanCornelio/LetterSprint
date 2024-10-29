import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'


export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lettersprint-66227.firebaseapp.com",
  projectId: "lettersprint-66227",
  storageBucket: "lettersprint-66227.appspot.com",
  messagingSenderId: "727410902629",
  appId: "1:727410902629:web:77d0c85fd1ea2a8174688c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
// El Auth
export const firebaseAuth = getAuth(firebaseApp)
// La BD
export const firebaseBD = getFirestore(firebaseApp)